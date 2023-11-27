const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/postController');

router.get('/', post_controller.get_posts);

router.post('/create', post_controller.create_post);

module.exports = router;
