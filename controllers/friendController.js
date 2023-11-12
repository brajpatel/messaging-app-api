const asyncHandler = require('express-async-handler');
const User = require('../models/user');

exports.add_friend = asyncHandler(async (req, res, next) => {
    const friend = await User.findById(req.body.friendid).exec();

    if(friend) {
        const user = await User.findById(req.body.userid).exec();

        if(user) {
            const updatedUser = new User({
                friends: [...user.friends, friend._id],
                _id: user._id
            })
    
            const updatedFriend = new User({
                friends: [...friend.friends, user._id],
                _id: friend._id
            })
    
            await User.findByIdAndUpdate(user._id, updatedUser, {});
            await User.findByIdAndUpdate(friend._id, updatedFriend, {});

            return res.status(200).json({ message: 'Friend added to both accounts' });
        }
        else {
            return res.status(404).json({ message: 'User could not be found' })
        }
    }
    else {
        return res.status(404).json({ message: 'Friend could not be found' })
    }
})

exports.remove_friend = asyncHandler(async (req, res, next) => {
    res.json({ message: 'remove friend' });
})