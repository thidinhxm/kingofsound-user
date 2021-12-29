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
            return done(null, false, req.flash('error', 'Thông tin tài khoản hoặc mật khẩu chưa chính xác'));
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false , req.flash('error', 'Thông tin tài khoản hoặc mật khẩu chưa chính xác'));
        }
        if (!user.is_verified) {
            return done(null, false, req.flash('error', 'Tài khoản chưa được xác thực'));
        }
        if (user.is_blocked) {
            return done(null, false, req.flash('error', 'Tài khoản đã bị khóa'));
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