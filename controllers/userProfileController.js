const { body, validationResult } = require('express-validator');
const passwordValidator = require('password-validator');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.create_account = [
    body("username", "username must contain at least 3 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("email", "email must be valid")
        .trim()
        .escape(),

    function(req, res, next) {
        if(req.body.password !== req.body.confirm_password) {
            return res.status(400).json({ message: "Passwords do not match"});
        }

        const schema = new passwordValidator();
        schema
            .is().min(6)
            .has().lowercase()
            .has().uppercase()
            .has().not().spaces()

        if(!schema.validate(req.body.password)) {
            return res.status(400).json({ message: "Password must be at least 6 characters in length, with at least one uppercase character"});
        }

    },

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            status_message: '',
            profile_picture: '',
            password: req.body.password,
            date_joined: new Date().toLocaleDateString(),
            friends: []
        })

        if(!errors.isEmpty()) {
            return res.status(400).json({ message: "Please fill in all the fields correctly" });
        }
        else {
            bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
                if(err) return next(err);
                user.password = hashedPassword;
                
                await user.save();
                return res.status(200);
            })
        }
    })
]

exports.update_account = asyncHandler(async (req, res, next) => {

})

exports.delete_account = asyncHandler(async (req, res, next) => {

})