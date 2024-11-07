import passport from "passport";
import User from "../models/user.models.js";
import { fileUpload } from "../config/cloudenry.js";
import bcrypt from "bcrypt";

const googleAuth = (req, res, next) => {
  passport.authenticate("google", { session: false }, (error, data) => {
    if (error || !data) {
      return res.redirect("/login?error=failed");
    }

    const { token, user } = data;

    //httpOnly ensures that the cookie is not accessible through client-side scripts
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.redirect(`/${token}`);
  })(req, res, next);
};

const register = async (req, res, next) => {
  const { name, email, password, role, experties, interests, bio } = req.body;
  // console.log(req.body);
  // console.log(req.file);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // let pfpUrl = 'pfp.jpg';
    // if (profilePicture) {
    //   pfpUrl = await fileUpload(profle);
    // }

    const user = await User.create({
      role,
      email,
      name,
      password,
      experties,
      interests,
      bio,
      // profilePicture: pfpUrl,
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
    const user = await User.findOne({ email }).select('+password');

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
    return res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true, 
    }).status(200).json({
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

export { googleAuth, register, login, getUser };
