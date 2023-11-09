const asyncHandler = require('express-async-handler');
const Chat = require('../models/chat');
const User = require('../models/user');

exports.create_chat = asyncHandler(async (req, res, next) => {
    const [userOne, userTwo] = await Promise.all([
        User.findById(req.body.users[0]).exec(),
        User.findById(req.body.users[1]).exec()
    ])

    const chat = new Chat({
        users: [...req.body.users],
        messages: []
    })

    if(!userOne || !userTwo) {
        return res.status(400).json({ message: 'Users could not be found' });
    }
    else {
        const chatExists = await Chat.find({ users: [...req.body.users] }).exec();

        res.json(chatExists)

        if(chatExists) {
            return res.json({ message: 'A chat between these two users already exists' });
        }
        else {
            await chat.save();

            return res.status(200).json({ message: 'New chat created' });
        }
    }
})

exports.chat_get = asyncHandler(async (req, res, next) => {
    res.json({ message: 'get chat' });
})

exports.send_message = asyncHandler(async (req, res, next) => {
    res.json({ message: 'send message' });
})