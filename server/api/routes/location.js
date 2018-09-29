const express = require('express');
const router = express.Router();
const location_controller = require('../controllers/locationController'); 

router.get('/', location_controller.location_list);

router.post('/', location_controller.location_create);

router.get('/:locationId', location_controller.location_get);

router.patch('/:locationId', location_controller.location_update);

router.delete('/:locationId', location_controller.location_delete);

module.exports = router;