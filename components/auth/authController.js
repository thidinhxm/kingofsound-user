const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const userService = require('../users/userService');
const cartService = require('../carts/cartService');

exports.login = (req, res, next) => {
    res.render('../components/auth/authViews/login', {error: req.flash('error')[0]});
}

exports.register = (req, res, next) => {
    res.render('../components/auth/authViews/register');
}

exports.registerPost = async (req, res, next) => {
    try {
        const { 
            firstname, lastname, email, password, address, phone, 
        } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);
        const user = await userService.createUser({
            firstname: firstname, 
            lastname: lastname,
            email: email, 
            address: address, 
            phone: phone, 
            password: passwordHash,
            token: crypto.randomBytes(64).toString('hex'),
        });
        
        await userService.createUserRole({
            role_id: 3,
            user_id: user.user_id,
        });

        await cartService.createCart(user.user_id);
        
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const host = req.get('host');
        const protocol = req.protocol;
        const link = `${protocol}://${host}/verify?token=${user.token}`;

        const mailOptions = {
            from: 'King Of Sound',
            to: email,
            subject: '[KingOfSound] Xác thưc tài khoản',
            html: `<h1>Xác thực tài khoản</h1>
                    <h4>Cám ơn bạn đã đăng kí tài khoản trên website KingOfSound</h4>
                    <p>Vui lòng bấm vào đường dẫn bên dưới để hoàn tất việc xác thực tài khoản:</p>
                    <a href="${link}">Xác thực tài khoản</a>`
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(info);
            }
        }
        );
        res.render('../components/auth/authViews/notification', {
            message: 'Vui lòng kiểm tra email để xác thực tài khoản'
        });
        
    }
    catch (err) {
        next(err);
    }       
}

exports.notify = (req, res, next) => {
    res.render('../components/auth/authViews/notification');
}

exports.logout = async (req, res, next) => {
    req.logout();
    req.session.cart = await cartService.getUnauthCart(req.session.unauth_id);
    res.redirect('/');
}


exports.verify = async (req, res, next) => {
    try {
        const user = await userService.getUserByToken(req.query.token);
        if (user) {
            user.is_verified = 1;
            user.token = null;
            await userService.updateUser(user);
            res.redirect('/login');
        }
        else {
            res.send('<h1>Xác thực thất bại do bạn bấm vào không đúng đường link, vui lòng vào email để xác thực lại</h1>');
        }
    }
    catch (err) {
        next(err);
    }
}

