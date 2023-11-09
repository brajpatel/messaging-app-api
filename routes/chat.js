const express = require('express');
const router = express.Router();
const chat_controller = require('../controllers/chatController');

router.post('/create', chat_controller.create_chat);

router.get('/:id', chat_controller.chat_get);

router.post('/:id', chat_controller.send_message);

module.exports = router;
