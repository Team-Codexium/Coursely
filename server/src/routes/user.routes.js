import { Router } from "express";
import passport from 'passport';
import jwtAuthentication from "../middlewares/jwtAuthentication.js";
import { getUser, googleAuth, login, register, updateUser, uploadMedia } from "../controllers/users.controller.js"
import {upload} from "../middlewares/multer.js";


const router = Router();

router.route("auth/google", passport.authenticate('google', { scope: ['profile', 'email']}));
router.route('/auth/google/callback').post(googleAuth);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/getUser').get(jwtAuthentication, getUser);
router.route('/update-profile').patch(jwtAuthentication, updateUser)
router.route('/upload-media').post(upload.single("media"), uploadMedia)


export default router;