import mongoose, { Schema } from "mongoose";


const ProgressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  lesson: {
    type: Schema.Types.ObjectId,
    ref: "Lesson",
    required: true
  },
  status: {
    type: String,
    enum: ["In Progress", "Completed", "Not Started"],
  }
}, { timestamps: true});

export default Progress = mongoose.model("Progress", ProgressSchema);