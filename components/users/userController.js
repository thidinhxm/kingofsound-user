const userService = require('./userService');
const passport = require('../auth/passport')
exports.isLogin = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

exports.profile = (req, res) => {
    res.render('../components/users/userViews/profile')
}

exports.editProfile = (req, res) => {
    res.render('../components/users/userViews/editProfile')
}
exports.changePassword = (req, res) => {
    res.render('../components/users/userViews/changePassword')
}
exports.updateUser = async (req,res) =>
{         
 const firstname = req.query.firstname;
 const lastname = req.query.lastname;
 const email = req.query.email;
 const phone = req.query.phone;
 const address = req.query.address;
 const user_id = req.user.user_id;
     await userService.updateUser({
            firstname: firstname, 
            lastname: lastname,
            email: email, 
            address: address, 
            phone: phone,
            user_id:user_id
        });
        res.redirect('/user/profile',{message:"Cập nhật thành công!"});    
}
exports.updatePassword = (req,res) =>
{

}

