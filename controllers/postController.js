const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Post = require('../models/post');

exports.get_posts = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find({}).populate('user', 'username').exec();
    
    if(!allPosts) {
        return res.status(404).json({ message: 'Posts could not be found' })
    }

    return res.status(200).json(allPosts);
})

exports.create_post = [
    body("message", "Message can not be longer than 70 characters long")
        .isLength({ max: 120 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const post = new Post({
            message: req.body.message,
            date_created: new Date().toISOString(),
            user: req.body.userId
        })

        if(!errors.isEmpty()) {
            return res.status(400).json({
                message: "Please fill in all the fields correctly",
                errors: errors.array()
            })
        }
        else {
            await post.save();
            return res.status(200).json({ message: 'Post successfully created' });
        }
    })
]