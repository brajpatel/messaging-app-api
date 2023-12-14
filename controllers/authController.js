const passport = require('passport');

exports.login = [
    passport.authenticate("local", {
        successRedirect: "/",
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