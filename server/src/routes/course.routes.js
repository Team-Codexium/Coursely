import { Router } from "express";
import jwtAuthentication from "../middlewares/jwtAuthentication.js";
import { courses, createCourse } from "../controllers/courses.controller.js";


const router = Router();

router.route('/').get(courses);
router.route("/create").post(createCourse)


export default router;