const userService = require('../users/userService');
const passport = require('./passport');

exports.login = (req, res, next) => {
    res.render('../components/auth/authViews/login');
}

exports.register = (req, res, next) => {
    res.render('../components/auth/authViews/register');
}

exports.registerPost = async (req, res, next) => {
    try {
        const { 
            firstname,
            lastname, 
            email, 
            password, 
            address, 
            phone, 
            confirmPassword, 
            keepLoggedIn 
        } = req.body;
        
        
        if (await userService.getUserByEmail(email)) {
            res.render('../components/auth/authViews/register', {
                message: 'Email đã tồn tại',
                type: 'alert-danger'
            });
            return;
        }

        if (password !== confirmPassword) {
            res.render('../components/auth/authViews/register', {
                message: 'Mật khẩu không khớp',
                type: 'alert-danger'
            });
            return;
        }

        const user = await userService.createUser({
            firstname: firstname, 
            lastname: lastname,
            email: email, 
            address: address, 
            phone: phone, 
            password: password
        });

        await userService.createUserRole({
            role_id: 3,
            user_id: user.user_id,
        });

        if (keepLoggedIn) {
            req.session.user = user;
        }
        else {
            req.session.user = null;
        }
        res.redirect('/');
    }
    catch (err) {
        next(err);
    }       
}


exports.loginPost = async (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }), (req, res, next) => {
        console.log('passport auth success');
        if (req.user) {
            res.redirect('/');
        }
        else {
            res.redirect('/login');
        }
    };
}
