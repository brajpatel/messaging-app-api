const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

exports.create_account = [
    body("username", "username must contain at least 3 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("email", "email must be valid")
        .trim()
        .escape(),

    asyncHandler(async (req, res, next) => {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            status_message: req.body.status_message,
            profile_picture: '',
            password: { type: String, required: true },
            date_joined: new Date().toLocaleDateString(),
            friends: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]
        })
    })
]

exports.update_account = asyncHandler(async (req, res, next) => {

})

exports.delete_account = asyncHandler(async (req, res, next) => {

})