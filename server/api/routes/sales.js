const express = require('express');
const router = express.Router();
const sales_controller = require('../controllers/salesController');

router.get('/', sales_controller.getSales);

router.post('/', sales_controller.createSales);

router.get('/:locationid/:salesdate', sales_controller.getSalesByLocation);

router.delete('/:salesId', sales_controller.salesDelete);

module.exports = router;