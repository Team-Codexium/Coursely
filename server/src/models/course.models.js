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
    price: Number,
    language: String,
    lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
    revies: [{ type: Schema.Types.ObjectId, ref: "Review" }],
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
