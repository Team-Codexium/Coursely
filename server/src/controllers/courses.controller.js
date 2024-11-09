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

const createCourse = async (req, res) => {
  try {
    const data = req.body;
    console.log("Data", data)

    const newCourse = await Course.create(data);
    console.log("newcisd", newCourse)
    return res.status(201).json({status: true, message: "Course created successfully", course: newCourse});

  } catch (error) {
    return res.status(500).json({status: false, message: "Error during creating course", error: error})
  }
}

export {
  courses,
  createCourse
}