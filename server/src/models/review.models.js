import mongoose from "mongoose"

const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    required: true,
    minLength: [3, "Comment must be at least 3 characters long"],
    maxlength: [500, "Comment cannot exceed 500 characters"],
    trim: true
  }
}, {timestamp: true})

export const Review = mongoose.model('Review', ReviewSchema);