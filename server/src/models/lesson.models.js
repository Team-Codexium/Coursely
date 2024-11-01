import mongoose, { Schema } from "mongoose";


const LessonSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: String,
  duration: Number,
  postion: Number,
});

export const Lesson = mongoose.model('Lesson', LessonSchema);