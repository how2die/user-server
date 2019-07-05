const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');

router.post('/users', user_controller.registerUser);
router.post('/users/logins', user_controller.loginUser);
router.get('/users/:userid', user_controller.getUserById);

module.exports = router;
