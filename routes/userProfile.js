const express = require('express');
const router = express.Router();
const user_profile_controller = require('../controllers/userProfileController');

router.post('/create', user_profile_controller.create_account);

router.post('/:id/update', user_profile_controller.update_account);

router.delete('/:id/delete', user_profile_controller.delete_account);

module.exports = router;
