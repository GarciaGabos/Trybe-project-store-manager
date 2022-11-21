const express = require('express');
require('express-async-errors');

const productsRouter = require('./routers/products.router');
const salesRouter = require('./routers/sales.router');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(productsRouter);
app.use(salesRouter);

module.exports = app;
