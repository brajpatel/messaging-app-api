const express = require('express');
const router = express.Router();

router.get('/sign-up', function(req, res, next) {
    res.json({ message: 'sign user up' })
});

router.get('/login', function(req, res, next) {
    res.json({ message: 'log user in' })
});

router.get('/logout', function(req, res, next) {
    res.json({ message: 'log user out' })
});

module.exports = router;
