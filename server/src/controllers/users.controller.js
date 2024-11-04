import passport from "passport";
import User from "../models/user.models.js";

const generateToken = async (id) => {
  try {
    const user = await User.findOne(id);
    const token = user.generateAccessToken();
    return token;
  } catch (error) {
    console.log("Error during generating token: ", error);
  }
};

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
  const { name, email, password, role } = req.body;
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
    });

    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Strict"
    })
    return res
      .status(200).json({ status: true, message: "User created successfully" });
  } catch (err) {
    return res
      .status(400)
      .json({ status: false, message: err.message });
  }
};

const login = async(req, res, next) => {
  const {email, password} = req.body;

  try{

    const user = await User.findOne({
      email
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not registeres",
      });
    }

    const isAuthenticated = await bcrypt.compare(password, user.password)
    
    if(isAuthenticated){
      return res.status(200).json({
        success: true,
        message: "User logged in successfully"
      });
    }
    
    return res.status(401).json({
      success: false,
      message: "Invalid password",
    })
  } catch(err) {
    return res.status(500).json({
      message: "Internal Server Error",
    })
  }
};

export { googleAuth, register, login };
