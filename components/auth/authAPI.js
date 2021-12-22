const userService = require('../users/userService');
const bcrypt = require('bcrypt');

exports.checkExistsAccount = async (req, res, next) => {
    try {
        const {email} = req.body;
        const account = await userService.getAccountByEmail(email);
        if (account) {
            res.json(true);
        }
        else {
            res.json(false);
        }
    }
    catch (err) {
        next(err);
    }
}

exports.checkUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await userService.getUserByEmail(email);
        if (!user) {
            res.json(false);
        }
        else {
            if (bcrypt.compareSync(password, user.password)) {
                res.json(true);
            }
            else {
                res.json(false);
            }
        }
    }
    catch (err) {
        next(err);
    }
}
