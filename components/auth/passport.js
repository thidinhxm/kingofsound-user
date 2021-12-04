const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userService = require('../users/userService');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await userService.findByEmail(email);
        if (!user) {
            return done(null, false, { message: 'Email không đúng.' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Mật khẩu không đúng.' });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}
));

function validPassword(user, password) {
    return user.password === password;
}
