import mongoose, { Schema } from "mongoose";


const EnrollmentSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  completed: {
    type: Boolean,
    default: false // Marks completion status
  }
}, { timestamps: true});

export default Enrollment = mongoose.model("Enrollment", EnrollmentSchema);