const userService = require('./userService');
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
exports.cart = (req, res) => {
        const user_id = req.params.user_id;
        const detailCart = userService.getCart(user_id);
        res.render('../components/users/userViews/cart',{detailCart})
}
exports.checkout = (req, res) => {
    res.render('../components/users/userViews/checkout')
}
exports.editProfile = (req, res) => {
    res.render('../components/users/userViews/editProfile')
}
exports.changePassword = (req, res) => {
    res.render('../components/users/userViews/changePassword')
}


