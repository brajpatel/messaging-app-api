const asyncHandler = require('express-async-handler');
const Chat = require('../models/chat');
const User = require('../models/user');

// Sipp77 - 654bbc119a40fbaf15313dcc
// NotSipp77 - 654cba4205bf93a58adc3174

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

        if(chatExists.length) {
            return res.json({ message: 'A chat between these two users already exists', chatExists: chatExists });
        }
        else {
            await chat.save();

            return res.status(200).json({ message: 'New chat created' });
        }
    }
})

exports.chat_get = asyncHandler(async (req, res, next) => {
    const chat = await Chat.find({ users: [...req.body.users] }).exec();
    
    if(!chat) {
        return res.status(404).json({ message: 'The chat you are looking for could not be found' })
    }

    return res.status(200).json(chat);
})

exports.send_message = asyncHandler(async (req, res, next) => {
    if(req.body.message.trim() === '') {
        return res.json({ message: 'Message can not be left blank' });
    }

    const chat = await Chat.findById(req.params.id).exec();

    if(chat) {
        const newMessage = {
            message: req.body.message,
            date_sent: new Date().toLocaleDateString(),
            time_sent: new Date().toLocaleTimeString(),
            user_id: req.body.userId
        }

        const updatedChat = new Chat({
            users: chat.users,
            messages: [...chat.messages, newMessage],
            _id: req.params.id
        })

        await Chat.findByIdAndUpdate(req.params.id, updatedChat, {});
        return res.status(200).json({ message: 'Message sent' })
    }
    else {
        return res.json({ message: 'Message not sent' });
    }
})