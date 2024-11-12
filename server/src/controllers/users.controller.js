import passport from "passport";
import User from "../models/user.models.js";
import { uploadOnCloudinary } from "../config/cloudenry.js";
import bcrypt from "bcrypt";
import multer from "multer";
import mongoose from "mongoose";

const googleAuth = (req, res, next) => {
  passport.authenticate("google", { session: false }, (error, data) => {
    if (error || !data) {
      return res.redirect("/login?error=failed");
    }

    const { token, user } = data;

    //httpOnly ensures that the cookie is not accessible through client-side scripts
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
    });
    res.redirect(`/dashboard`);
  })(req, res, next);
};

const register = async (req, res, next) => {
  const { name, email, password, role, experties, interests, bio } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      role,
      email,
      name,
      password,
      experties,
      interests,
      bio,
    });

    //Generating token
    const token = await user.generateAccessToken();
    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .status(200)
      .json({
        success: true,
        message: "User created successfully",
        user,
        token,
      });
  } catch (err) {
    return res.status(400).json({ status: false, message: err.message });
  }
};

const login = async (req, res, next) => {
  //Input from frontend
  const { email, password } = req.body;

  try {
    // checks if the user is already exists
    const user = await User.findOne({ email }).select("+password");
    
    // if doesnt
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not registered" });
    }
    const isAuthenticated = await user.isValidPassword(password);

    if (!isAuthenticated) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    //Generating JWT token
    const token = await user.generateAccessToken(user._id);
    //Setting the token in the response cookie sending response
    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Strict",
        secure: true,
      })
      .status(200)
      .json({
        success: true,
        message: "User logged in successfully",
        token,
      });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUser = async (req, res, next) => {
  const userId = req.user._id;
  try {
    
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, message: "User fetched successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "UNATHORIZED", error: error });
  }
};

const uploadMedia = async (req, res) => {
  try {
    const mediaPath = req.file?.path;

    if (!mediaPath) {
      return res
        .status(400)
        .json({ success: false, message: "No mediae provided" });
    }

    const media = await uploadOnCloudinary(mediaPath);
    if (!media.url) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Error uploading media to Cloudinary",
        });
    }
    const url = media.url;;
    return res.status(200).json({
      success: true,
      message: "Media uploaded",
      url,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateUser = async (req, res, next) => {
  const userId = req.user._id;
  const { name, experties, interests, bio, pfp } = req.body;
  
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {$set: {
        name,
        experties,
        interests,
        bio,
        pfp,
      }},
      { new: true }
    );
  
    if (!user) {
      return res
       .status(404)
       
       .json({ success: false, message: "User not found" });
    }
    return res.status(200).send({ success: true, message: "User details updated successfully"});

  } catch (error) {
    return res
     .status(500)
     .json({ success: false, message: "Error updating user", error: error });
  }
}

export { googleAuth, register, login, getUser, uploadMedia, updateUser };
