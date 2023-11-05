const express = require('express');
const router = express.Router();

router.post('/create', function(req, res, next) {
    res.json({ message: 'create chat' })
});

router.post('/delete', function(req, res, next) {
    res.json({ message: 'delete chat' })
});

module.exports = router;