const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const userService = require('../users/userService');
const cartService = require('../carts/cartService');

exports.login = (req, res, next) => {
    res.render('../components/auth/authViews/login', {
        error: req.flash('error'),
        success: req.flash('success'),
    });
}

exports.logout = async (req, res, next) => {
    req.logout();
    req.session.cart = await cartService.getUnauthCart(req.session.unauth_id);
    res.redirect('/');
}

exports.register = (req, res, next) => {
    res.render('../components/auth/authViews/register', {
        error: req.flash('error'),
        success: req.flash('success'),
    });
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
        
        req.flash('email', email);
        
        res.redirect('/send');
        
    }
    catch (err) {
        next(err);
    }       
}

exports.sendMailToVerifyUser = async (req, res, next) => {
    try {
        const email = req.flash('email');
        const user = await userService.getUserByEmail(email);
        if (!user) {
            req.flash('error', 'Tài khoản không tồn tại');
            res.redirect('/register');
        }
        else {
            user.token = crypto.randomBytes(64).toString('hex');
            user.expired_at = new Date(Date.now() + 24 * 60 * 60 * 1000);
            await userService.updateUser(user);
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const link = `${req.protocol}://${req.get('host')}/verify?token=${user.token}`;

            const mailOptions = {
                from: 'King Of Sound',
                to: email,
                subject: '[KingOfSound] Xác thưc tài khoản',
                html: `<p>Chào ${user.firstname} ${user.lastname},</p>
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
                    req.flash('error', 'Có lỗi xảy ra, vui lòng thử lại sau');
                    res.redirect('/register');
                }
                else {
                    req.flash('success', 'Bạn đã đăng kí thành công, vui lòng kiểm tra email để xác thực tài khoản');
                    res.redirect('/login');
                }
            });
            
        }
    }
    catch (err) {
        next(err);
    }
}

exports.verify = async (req, res, next) => {
    try {
        const user = await userService.getUserByToken(req.query.token);
        if (user) {
            if (user.expired_at < new Date()) {
                req.flash('error', 'Link xác thực tài khoản đã hết hạn');
                res.redirect('/login');
            }
            else {
                user.is_verified = true;
                user.token = null;
                user.expired_at = null;
                await userService.updateUser(user);
                req.flash('success', 'Tài khoản đã được xác nhận');
                res.redirect('/login');
            }
        }
        else {
            req.flash('error', 'Tài khoản cần xác thực không tồn tại');
            res.redirect('/login');
        }
    }
    catch (err) {
        next(err);
    }
}

exports.forgotPassword = (req, res, next) => {
    res.render('../components/auth/authViews/forgotPassword', {
        error: req.flash('error'),
        success: req.flash('success')
    });
}

exports.forgotPasswordPost = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await userService.getUserByEmail(email);
        if (!user) {
            req.flash('error', 'Tài khoản không tồn tại');
            res.redirect('/forgot-password');
        }
        else {
            user.token = crypto.randomBytes(64).toString('hex');
            user.expired_at = new Date(Date.now() + 5 * 60 * 1000);
            await userService.updateUser(user);
            
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });
            
            const link = `${req.protocol}://${req.get('host')}/forgot-password-authentication?token=${user.token}&email=${email}`;

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
                    req.flash('error', 'Có lỗi xảy ra, vui lòng thử lại sau');
                    res.redirect('/forgot-password');
                }
                else {
                    req.flash('success', 'Vui lòng kiểm tra email để đổi mật khẩu trong vòng 5 phút');
                    res.redirect('/forgot-password');
                }
            });
        }
    }
    catch (err) {
        next(err);
    }
}

exports.forgotPasswordAuthentication = async (req, res, next) => {
    try {
        const { email, token } = req.query;
        const user = await userService.getUserByEmail(email);
        if (user) {
            if (user.token === token && user.expired_at > Date.now()) {
                user.expired_at = Date.now() + 5 * 60 * 1000; // 5 minutes
                req.flash('success', 'Vui lòng đổi mật khẩu trong vòng 5 phút');
                req.flash('email', email);
                req.flash('token', token);
                res.redirect('/reset-password');
            }
            else {
                req.flash('error', 'Link không đúng hoặc đã hết hạn, vui lòng nhập email để gửi lại');
                res.redirect('/forgot-password');
            }
        }
        else {
            req.flash('error', 'Link không đúng hoặc đã hết hạn, vui lòng nhập email để gửi lại');
            res.redirect('/forgot-password');
        }
    }
    catch(err) {
        next(err);
    }
}
exports.resetPassword = (req, res, next) => {
    const email = req.flash('email');
    const token = req.flash('token');
    if (email.length && token.length) {
        res.render('../components/auth/authViews/resetPassword', {
            error: req.flash('error'),
            success: req.flash('success'),
            email: email,
            token: token
        });
    }
    else {
        req.flash('error', 'Không thể đặt lại mật khẩu khi chưa nhập email');
        res.redirect('/forgot-password');
    }
}

exports.resetPasswordPost = async (req, res, next) => {
    try {
        const { password, confirmPassword, token, email } = req.body;
        
        if (password !== confirmPassword) {
            req.flash('error', 'Mật khẩu không khớp');
            req.flash('email', email);
            req.flash('token', token);
            res.redirect('/reset-password');
        }
        else {
            const user = await userService.getUserByEmailAndToken(email, token);
            if (user) {
                const salt = bcrypt.genSaltSync(10);
                user.password = bcrypt.hashSync(password, salt);
                user.token = null;
                await userService.updateUser(user);
                req.flash('success', 'Mật khẩu đã được đổi thành công');
                res.redirect('/login');
            }
            else {
                req.flash('error', 'Link không đúng hoặc đã hết hạn, vui lòng nhập email để gửi lại');
                res.redirect('/forgot-password');
            }
        }
    }
    catch (err) {
        next(err);
    }
}