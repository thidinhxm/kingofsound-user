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
            fullname, 
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
        const user_id = email.split('@')[0].substr(0, 20);

        await userService.createUser({
            user_id: user_id, 
            fullname: fullname, 
            email: email, 
            address: address, 
            phone: phone, 
            password: password
        });

        await userService.createUserRole({
            user_id: user_id,
            role_id: 'KH'
        });

        if (keepLoggedIn) {
            req.session.user = {
                user_id,
                fullname,
                email,
                address,
                phone,
                password
            }
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
