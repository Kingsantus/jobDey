const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Adjust this path to your User model

passport.use(new LocalStrategy(
  async function (username, password, done) {
    try {
      // Find user by username or email
      const user = await User.findOne({ $or: [{ username }, { email: username }] }); //.exec();
      
      if (!user) {
        return done(null, false, { message: 'Incorrect username or email.' });
      }

      // Use bcrypt to compare the plain-text password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      if (!user.isVerified) {
        return done(null, false, { message: 'User not verified.' });
      }

      // If the user exists and password matches, return the user
      return done(null, user);
      
    } catch (err) {
      return done(err);
    }
  }
));
