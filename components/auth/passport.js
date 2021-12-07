const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userService = require('../users/userService');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return done(null, false, req.flash('error', 'Không tồn tại email này'));
        }
        if (!validPassword(user, password)) {
            return done(null, false, req.flash('error', 'Mật khẩu không đúng'));
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

function validPassword(user, password) {
    return bcrypt.compareSync(password, user.password);
}

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    return done(null, user);
});



module.exports = passport;