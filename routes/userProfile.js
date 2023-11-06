const express = require('express');
const router = express.Router();
const user_profile_controller = require('../controllers/userProfileController');

router.post('/create', user_profile_controller.create_account);

router.post('/update', function(req, res, next) {
    res.json({ message: 'update user profile' });
});

router.post('/delete', function(req, res, next) {
    res.json({ message: 'delete user profile' });
})

module.exports = router;
