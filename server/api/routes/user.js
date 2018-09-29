const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController'); 

router.get('/', user_controller.user_list);

router.post('/', user_controller.user_create);

router.get('/:userId', user_controller.user_get);

router.patch('/:userId', user_controller.user_update);

router.delete('/:userId', user_controller.user_delete);

module.exports = router;