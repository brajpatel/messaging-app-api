const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

exports.add_friend = asyncHandler(async (req, res, next) => {
    res.json({ message: 'add friend' });
})

exports.remove_friend = asyncHandler(async (req, res, next) => {
    res.json({ message: 'remove friend' });
})