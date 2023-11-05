const express = require('express');
const router = express.Router();

router.post('/create', function(req, res, next) {
    res.json({ message: 'sign user up' });
});

router.post('/update', function(req, res, next) {
    res.json({ message: 'update user profile' });
});

router.post('/deelte', function(req, res, next) {
    res.json({ message: 'delete user profile' });
})

module.exports = router;
