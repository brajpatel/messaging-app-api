const asyncHandler = require('express-async-handler');
const User = require('../models/user');

exports.create_account = [
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