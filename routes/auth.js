const express = require('express');
const router = express.Router();

router.post('/login', function(req, res, next) {
    res.json({ message: 'log user in' })
});

router.post('/logout', function(req, res, next) {
    res.json({ message: 'log user out' })
});

module.exports = router;
