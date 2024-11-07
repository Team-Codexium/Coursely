import { Router } from "express";
import jwtAuthentication from "../middlewares/jwtAuthentication.js";
import { courses } from "../controllers/courses.controller.js";


const router = Router();

router.route('/').get(courses);


export default router;