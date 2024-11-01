import mongoose, { Schema } from "mongoose";

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
      required: true,
    },
    profilePicture: {
      type: String, // Cloud url for pfp
      default: "default.jpg",
    },
    bio: {
      type: String,
      trim: true,
    },
    googleId: String,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
