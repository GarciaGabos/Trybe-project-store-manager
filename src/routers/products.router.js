const express = require('express');

const router = express.Router();

const validations = require('../middlewares/validationMiddlewares');

const productsController = require('../controllers/products.controller');

router.get('/products', productsController.listAll);

router.get('/products/:id', productsController.listById);

router.post('/products', validations.validateProducts, productsController.postProduct);

router.put('/products/:id', validations.validateProducts, productsController.putProduct);

router.delete('/products/:id', productsController.deleteProduct);

module.exports = router;
