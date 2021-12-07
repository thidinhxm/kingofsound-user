exports.isLogin = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

exports.profile = (req, res) => {
    res.render('../components/users/userViews/profile', {user: req.user})
}