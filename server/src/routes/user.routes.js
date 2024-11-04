import { Router } from "express";
import passport from 'passport';
import jwtAuthentication from "../middlewares/jwtAuthentication.js";
import { googleAuth, login, register } from "../controllers/users.controller.js"

const router = Router();

router.route("auth/google", passport.authenticate('google', { scope: ['profile', 'email']}));
router.route('/auth/google/callback').get(googleAuth);
router.route('/register').post(register);
router.route('/login').post(login);


export default router;