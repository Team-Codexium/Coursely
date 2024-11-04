import { GoogleStrategy } from 'passport-google-oauth20/Strategy';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from "../models/user.models.js"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      //First cheack if the user already exists
      let user = await User.findOne({ googleId: profile.id });
      
      //if user doesnt exist then create a new user
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          profilePicture: profile.photos[0].value
        });
      }

      //Generate token with id and role
      const token = jwt.sign({
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h'}
    )

    return cd(null, { user, token })

    } catch (error) {
      cd(error, null);
    }
  }
));