const userService = require('../users/userService');
const passort = require('./passport');

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
            user_id: user.user_id,
            role_id: 3,
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
