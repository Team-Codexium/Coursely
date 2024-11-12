import mongoose from "mongoose";
import Course from "../models/course.models.js"
import Lesson from "../models/lesson.models.js";
import User from "../models/user.models.js";



const createCourse = async (req, res) => {
  try {
    const { title, description, price, language, lessons, userId } = req.body;
    const parsedLessons = typeof lessons === "string" ? JSON.parse(lessons) : lessons;
    const parsedPrice = typeof lessons === "string" ? parseInt(price) : price;
    const instructor = new mongoose.Types.ObjectId(userId)
    const newCourse = await Course.create({
      title,
      description,
      price: parsedPrice,
      language,
      lessons:  parsedLessons,
      instructor,
    });
    const user = await User.findByIdAndUpdate(userId,{ $push: { courseCreated: newCourse._id}}, {new: true})
    return res.status(201).json({status: true, message: "Course created successfully", course: newCourse});

  } catch (error) { 
    return res.status(500).json({status: false, message: "Error during creating course", error: error})
  }
}

const courses = async (req,res) => {
  try {
    const courses = await Course.find();
    console.log(courses)
    if (!courses) {
      return res.status(404).json({status: false, message: "No courses found"});
    }
    return res.status(200).json({status: true, message: "Courses fetched successfully", courses: courses});
  } catch (error) {
    res.status(500).json({status: false, message: "Error fetching courses", error: error})
  }
}

export {
  courses,
  createCourse,
}