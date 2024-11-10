import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price:{
      type: String,
      default: "0"
    },
    language: String,
    lessons: [{ 
      title: {
        type: String,
        required: true,
        trim: true,
      },
      content: {
        type: String,
        required: true,
      },
      duration: String,
      postion: Number,
     }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    assignments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Assignment",
      },
    ],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", CourseSchema);

export default Course;
