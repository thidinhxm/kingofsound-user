const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userService = require('../users/userService');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return done(null, false, { message: 'Email không đúng.' });
        }
        if (!validPassword(user, password)) {
            return done(null, false, { message: 'Mật khẩu không đúng.' });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}
));

function validPassword(user, password) {
    return bcrypt.compareSync(password, user.password);
}

passport.serializeUser(function(user, done) {
    done(null, user.user_id);
});

passport.deserializeUser(function(id, done) {
    userService.getUserById(id).then( (user) => {
        done(null, user);
    })
});

module.exports = passport;