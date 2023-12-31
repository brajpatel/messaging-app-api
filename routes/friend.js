const express = require('express');
const router = express.Router();
const friend_controller = require('../controllers/friendController');

router.get('/', friend_controller.get_users);

router.post('/add', friend_controller.add_friend);

router.post('/remove', friend_controller.remove_friend);

module.exports = router;
