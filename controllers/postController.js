const asyncHandler = require('express-async-handler');
const Post = require('../models/post');

exports.get_posts = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find().populate('user').exec();
    
    if(!allPosts) {
        return res.status(404).json({ message: 'Posts could not be found' })
    }

    return res.status(200).json(allPosts);
})

exports.create_post = []