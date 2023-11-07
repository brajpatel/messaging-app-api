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
        
        next();
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
            return res.status(400).json({
                message: "Please fill in all the fields correctly",
                errors: errors.array()
            });
        }
        else {            
            const emailExists = await User.findOne({ email: req.body.email }).collation({ locale: "en", strength: 2 }).exec();
            const usernameTaken = await User.findOne({ username: req.body.username }).collation({ locale: "en", strength: 2 }).exec();

            if(emailExists) {
                return res.status(400).json({ message: "An account with that email already exists" });
            }
            else if(usernameTaken) {
                return res.status(400).json({ message: "That username is already taken" });
            }
            else {
                bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
                    if(err) return next(err);    
                    user.password = hashedPassword;
                        
                    await user.save();
                    return res.status(200).json({ message: 'Account successfully created' });
                })
            }
        }
    })
]

exports.update_account = asyncHandler(async (req, res, next) => {

})

exports.delete_account = asyncHandler(async (req, res, next) => {

})