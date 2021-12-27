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
            html: `<p>Chào ${user.firstname} ${user.lastname}</p>
            <p>Ai đó đã gửi yêu cầu xác thực tài khoản đến webiste của King Of Sound Company</p>
            <p>Tài khoản xác thực: ${email}</p>
            <p>Nếu đây là một thao tác nhầm lẫn, bạn chỉ cần bỏ qua email này. Sẽ không có vấn đề gì xảy ra với tài khoản của bạn.</p>
            <p>Nếu đây là thao tác đúng lẽ, bạn cần bấm vào đường link bên dưới để đổi xác thực tài khoản:</p>
            <a href="${link}">Xác thực tài khoản</a>
            <p>Nếu bạn không biết về thao tác này, có lẽ ai đó đã cố gắng truy cập vào tài khoản của bạn. Vui lòng không gửi đường link này cho bất cứ ai</p>`
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

exports.forgotPassword = (req, res, next) => {
    res.render('../components/auth/authViews/forgotPassword');
}

exports.forgotPasswordPost = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await userService.getAccountByEmail(email);
        user.token = crypto.randomBytes(64).toString('hex');
        await userService.updateUser(user);
        console.log(user);
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const host = req.get('host');
        const protocol = req.protocol;
        const link = `${protocol}://${host}/reset-password?token=${user.token}&email=${email}`;

        const mailOptions = {
            from: 'King Of Sound',
            to: email,
            subject: '[KingOfSound] Quên mật khẩu',
            html: `<p>Chào ${user.firstname} ${user.lastname}</p>
                    <p>Ai đó đã gửi yêu cầu khôi phục mật khẩu tới webiste của King Of Sound Company</p>
                    <p>Tên đăng nhập: ${email}</p>
                    <p>Nếu đây là một thao tác nhầm lẫn, bạn chỉ cần bỏ qua email này. Sẽ không có vấn đề gì xảy ra với tài khoản của bạn.</p>
                    <p>Nếu đây là thao tác đúng lẽ, bạn cần bấm vào đường link bên dưới để đổi mật khẩu mới:</p>
                    <a href="${link}">Đổi mật khẩu</a>
                    <p>Nếu bạn không biết về thao tác này, có lẽ ai đó đã cố gắng truy cập vào tài khoản của bạn. Vui lòng không gửi đường link này cho bất cứ ai</p>`
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

exports.resetPassword = (req, res, next) => {
    const { token, email } = req.query;
    res.render('../components/auth/authViews/resetPassword', {token, email});
}

exports.resetPasswordPost = async (req, res, next) => {
    try {
        const { password, confirmPassword } = req.body;
        const { token, email } = req.query;
        if (password !== confirmPassword) {
            res.render('../components/auth/authViews/resetPassword', {
                error: 'Mật khẩu không khớp'
            });
        }
        else {
            const user = await userService.getUserByEmailAndToken(email, token);
            console.log(user);
            const thi = await userService.getAccountByEmail(email);
            console.log(thi);
            console.log(token, email);
            if (user) {
                const salt = bcrypt.genSaltSync(10);
                user.password = bcrypt.hashSync(password, salt);
                user.token = null;
                await userService.updateUser(user);
                res.redirect('/login');
            }
            else {
                res.render('../components/auth/authViews/resetPassword', {
                    error: 'Không thể đổi mật khẩu'
                });
            }
        }
    }
    catch (err) {
        next(err);
    }
}