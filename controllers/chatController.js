const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Chat = require('../models/chat');

exports.create_chat = asyncHandler(async (req, res, next) => {
    res.json({ message: 'create chat' });
})

exports.chat_get = asyncHandler(async (req, res, next) => {
    res.json({ message: 'get chat' });
})

exports.send_message = asyncHandler(async (req, res, next) => {
    res.json({ message: 'send message' });
})