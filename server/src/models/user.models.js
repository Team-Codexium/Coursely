import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["student", "instructor"],
      default: "student",
    },
    profilePicture: String, //Url to cloud provider
    interests: String,
    experties: String,
    bio: {
      type: String,
      trim: true,
      default: "",
    },
    googleId: String,
    enrollrdCourses: [
      { type: Schema.Types.ObjectId, ref: "Enrollment", default: [] },
    ],
    courseCreated: [{ type: Schema.Types.ObjectId, ref: "Course", default:[]}] // Only for instructors
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function () {
  try {
    return jwt.sign(
      {
        _id: this._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 3 * 24 * 60 * 60,
      }
    );
  } catch (e) {
    console.log("error generating access token", e);
  }
};

const User = mongoose.model("User", UserSchema);

export default User;
