const asyncHandler = require('express-async-handler');
const User = require('../models/user');

exports.get_users = asyncHandler(async (req, res, next) => {
    const allUsers = await User.find().exec();

    if(!allUsers) {
        return res.status(400).json({ message: 'Users could not be found' })
    }

    return res.status(200).json(allUsers);
})

exports.add_friend = asyncHandler(async (req, res, next) => {
    const friend = await User.findById(req.body.friendid).exec();

    if(friend) {
        const user = await User.findById(req.body.userid).exec();

        if(user) {
            if(user.friends.includes(friend._id) || friend.friends.includes(user._id)) {
                return res.json({ message: 'User is already friend' });
            }

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
        
        return res.status(404).json({ message: 'User could not be found' })
    }
    
    return res.status(404).json({ message: 'Friend could not be found' })
})

exports.remove_friend = asyncHandler(async (req, res, next) => {
    const friend = await User.findById(req.body.friendid).exec();
    
    if(friend) {
        const user = await User.findById(req.body.userid).exec();

        if(user) {
            await User.updateOne({ _id: user._id }, { $pull: { friends: friend._id } });
            await User.updateOne({ _id: friend._id }, { $pull: { friends: user._id } });

            return res.status(200).json({ message: 'Friend removed from both accounts' });
        }
        
        return res.status(404).json({ message: 'User could not be found' })
    }
    
    return res.status(404).json({ message: 'Friend could not be found' })
})