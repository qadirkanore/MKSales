const express = require('express');
const router = express.Router();
const auth_controller = require('../controllers/authController');

router.post('/login', auth_controller.auth_login);
router.post('/login/status', auth_controller.auth_loginStatus);
router.post('/logout', auth_controller.auth_logout);
router.get('/data', auth_controller.auth_data);

module.exports = router;