const asyncHandler = require('async-handler');
const passport = require('passport');

exports.login = [
    passport.authenticate("local", {
        sucessRedirect: "/",
        failureRedirect: "/"
    })
]

exports.logout = (req, res, next) => {
    req.logout(function(err) {
        if(err) {
            return next(err);
        }

        res.json({ user: null, message: 'Logged out'});
    })
}