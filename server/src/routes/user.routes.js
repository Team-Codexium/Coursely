import { Router } from "express";
import passport from 'passport';
import jwtAuthentication from "../middlewares/jwtAuthentication.js";
import { getUser, googleAuth, login, register } from "../controllers/users.controller.js"
import upload from "../middlewares/multer.js";


const router = Router();

router.route("auth/google", passport.authenticate('google', { scope: ['profile', 'email']}));
router.route('/auth/google/callback').get(googleAuth);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/getUser').get(jwtAuthentication, getUser);


export default router;