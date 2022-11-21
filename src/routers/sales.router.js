const express = require('express');

const router = express.Router();

const validations = require('../middlewares/validationMiddlewares');

const salesController = require('../controllers/sales.controller');

router.get('/sales', salesController.getAllSales);
  
router.get('/sales/:id', salesController.getSaleById);

router.post('/sales', validations.validateSaleTypos, salesController.postSale);

module.exports = router;
