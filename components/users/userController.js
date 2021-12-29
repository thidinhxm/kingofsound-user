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
exports.updateUser = async (req,res) =>
{         
 const firstname = req.body.firstname;
 const lastname = req.body.lastname;
 const email = req.body.email;
 const phone = req.body.phone;
 const address = req.body.address;
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
    req.session.passport.user = await userService.getUserById(user.user_id);
    req.session.save(function(err) {console.log(err);})
    //req.flash('message', 'Thay đổi thông tin thành công!');
    res.redirect('/user/profile?message=success'); 
}
exports.updatePassword = async (req,res) =>
{
    const oldpassword = req.body.oldpassword;
    const newpassword = req.body.newpassword;
    const renewpassword = req.body.renewpassword;
    const user = req.user;
    const id = user.user_id
    if (!bcrypt.compareSync(oldpassword, user.password))
        res.render('../components/users/userViews/changePassword',{error :"Mật khẩu chưa chính xác!"})
    else if(newpassword!=renewpassword)
        res.render('../components/users/userViews/changePassword',{error :"Mật khẩu mới không khớp!"})
    else
       {
        await userService.updatePassword(id,newpassword);
        res.redirect('/user/profile?message=success');  
       }
}
