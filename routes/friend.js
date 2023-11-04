const express = require('express');
const router = express.Router();

router.post('/add', function(req, res, next) {
    res.json({ message: 'add friend' })
});

router.post('/remove', function(req, res, next) {
    res.json({ message: 'remove friend' })
});

module.exports = router;
