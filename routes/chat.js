const express = require('express');
const router = express.Router();
const chat_controller = require('../controllers/chatController');

router.get('/', chat_controller.get_chat);

router.post('/create', chat_controller.create_chat);

router.post('/:id', chat_controller.send_message);

module.exports = router;
