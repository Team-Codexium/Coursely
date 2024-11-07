import Course from "../models/course.models.js"


const courses = async (req, res) => {
  try {
    const courses = await Course.find();
    if (!courses) {
      return res.status(404).json({status: false, message: "No courses found"});
    }
    return res.status(200).json({status: true, message: "Courses fetched successfully", courses: courses});
  } catch (error) {
    res.status(500).json({status: false, message: "Error fetching courses", error: error})
  }
}


export {
  courses
}