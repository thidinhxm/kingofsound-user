const userService = require('./userService');
const bcrypt = require('bcrypt');

exports.isLogin = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

exports.profile = (req, res) => {
    const check = req.query.message;
    if(check)
    res.render('../components/users/userViews/profile',{message:'Thay đổi thông tin thành công!'})
    else 
    res.render('../components/users/userViews/profile')
}

exports.editProfile = (req, res) => {
    res.render('../components/users/userViews/editProfile')
}
exports.changePassword = (req, res) => {
    res.render('../components/users/userViews/changePassword')
}
exports.updateUser = async (req,res,next) => {         
    try {
        const {firstname, lastname, email, phone, address} = req.body;
        const user = req.user;
        
        const updateUser = {
            firstname: firstname, 
            lastname: lastname,
            email: email, 
            address: address, 
            phone: phone,
            user_id: user.user_id
        }

        await userService.updateUser(updateUser);
        const newUser = await userService.getUserById(user.user_id);
        req.login(newUser, function(error) {
            if (!error) {
               console.log('succcessfully updated user');
               res.redirect('/user/profile?message=success'); 
            }
        });
        res.end();
        
    }
    catch (error) {
        next(error);
    }
}

exports.updatePassword = async (req,res,next) => {
    try {
        const { oldpassword, newpassword, renewpassword } = req.body.oldpassword;
        const user_id = req.user.user_id;

        if (!bcrypt.compareSync(oldpassword, user.password)) {
            res.render('../components/users/userViews/changePassword', {error :"Mật khẩu chưa chính xác!"})
        }
        else if(newpassword!=renewpassword) {
            res.render('../components/users/userViews/changePassword',{error :"Mật khẩu mới không khớp!"})
        }    
        else {
            const salt = bcrypt.genSaltSync(10);
            const passwordHash = bcrypt.hashSync(newpassword, salt);
            await userService.updatePassword(user_id, passwordHash);
            res.redirect('/user/profile?message=success');  
        }
    }
    catch (error) {
        next(error);
    }
}
