const userService = require('../users/userService');

exports.checkExistsAccount = async (req, res, next) => {
    try {
        const {email} = req.body;
        const account = await userService.getUserByEmail(email);
        if (!account) {
            res.json(false);
        }
        else if (account === 'admin') {
            res.json(account);
        }
        else {
            res.json(true);
        }
    }
    catch (err) {
        next(err);
    }
}

