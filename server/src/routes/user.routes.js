import { Router } from "express";
import passport from 'passport';
import jwtAuthentication from "../middlewares/jwtAuthentication.js";
import { getUser, googleAuth, login, register, updatePfp } from "../controllers/users.controller.js"
import {upload} from "../middlewares/multer.js";


const router = Router();

router.route("auth/google", passport.authenticate('google', { scope: ['profile', 'email']}));
router.route('/auth/google/callback').post(googleAuth);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/getUser').get(jwtAuthentication, getUser);
// router.route('/update-profile').post(upload.single("pfp"), updateProfile)
router.route('/update-pfp').post( upload.single("pfp"), updatePfp)


export default router;