const { body, validationResult } = require('express-validator');
const passwordValidator = require('password-validator');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Post = require('../models/post');
const Chat = require('../models/chat');

exports.create_account = [
    body("username", "username must contain at least 3 characters")
        .trim()
        .isLength({ min: 3 })
        .isLength({ max: 18 })
        .escape(),
    body("email", "email must be valid")
        .trim()
        .escape(),
    body("password", "password must be at least 6 characters in length")
        .isLength({ min: 6 })
        .escape(),
    body("confirm_password", "password must be at least 6 characters in length")
        .isLength({ min: 6 })
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

exports.update_account = [
    body("username", "username must contain at least 3 characters")
        .trim()
        .isLength({ min: 3 })
        .isLength({ max: 18 })
        .escape(),
    body("status_message", "status message can not be longer than 30 characters")
        .trim()
        .isLength({ max: 50 })
        .escape(),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const usernameTaken = await User.findOne({ username: req.body.username });

        if(usernameTaken) {
            return res.json({ message: 'Username is already taken' });
        }
        else if(!(errors.isEmpty())) {
            return res.status(400).json({
                message: "Please fill in all the fields correctly",
                errors: errors.array()
            });
        }
        else {
            const user = await User.findById(req.params.id);
            
            if(!user) {
                return res.json({ message: 'User could not be found' });
            }

            const updatedUser = new User({
                username: req.body.username,
                status_message: req.body.status_message,
                profile_picture: req.body.profile_picture,
                _id: user._id
            })

            await User.findByIdAndUpdate(user._id, updatedUser, {});
            return res.json({ message: 'Profile updated' });
        }
    }) 
]

exports.delete_account = asyncHandler(async (req, res, next) => {
    // DELETE ALL POSTS CREATED BY THE USER
    try {
        await Post.deleteMany({ "user": req.params.id })
    }
    catch(err) {
        console.log(err);
    }
    

    // DELETE ALL CHATS INVOLVING THE USER
    try {
        await Chat.deleteMany({ "users": req.params.id })
    }
    catch(err) {
        console.log(err);
    }
    
    // FIND ALL USERS WITH THIS FRIEND AND REMOVE
    try {
        await User.updateMany(
            { "friends": req.params.id },
            { $pull: { "friends": req.params.id } }
        )
    }
    catch(err) {
        console.log(err);
    }

    // await User.deleteOne({ _id: req.body.userid });

    return res.status(200).json({ message: 'Successfully deleted account - sign out and redirect to login page' });
})