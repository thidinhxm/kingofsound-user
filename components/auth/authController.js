const bcrypt = require('bcrypt');

const userService = require('../users/userService');

exports.login = (req, res, next) => {
    res.render('../components/auth/authViews/login', {message: req.flash('error')[0], type: 'alert-danger'});
}

exports.register = (req, res, next) => {
    res.render('../components/auth/authViews/register');
}

exports.registerPost = async (req, res, next) => {
    try {
        const { 
            firstname, lastname, email, password, address, phone, 
        } = req.body;
        
        const user = await userService.createUser({
            firstname: firstname, 
            lastname: lastname,
            email: email, 
            address: address, 
            phone: phone, 
            password: bcrypt.hashSync(password, 10)
        });

        await userService.createUserRole({
            role_id: 3,
            user_id: user.user_id,
        });
        req.session.user = user;
        res.redirect('/');
    }
    catch (err) {
        next(err);
    }       
}

exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}

