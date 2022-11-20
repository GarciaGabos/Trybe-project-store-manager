const express = require('express');
require('express-async-errors');

const productsDB = require('./services/productsDB');
const salesDB = require('./services/salesDB');
const validations = require('./services/validationMiddlewares');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', async (_req, res) => {
    const [result] = await productsDB.listAll();
    res.status(200).json(result);
});

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
  const [[result]] = await productsDB.listById(id);
  console.log(result);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
});

app.post('/products', validations.validateProducts, async (req, res) => {
  const { name } = req.body;
  const [result] = await productsDB.insert(name);
  res.status(201).json({ id: result.insertId, name });
});

app.get('/sales', async (_req, res) => {
  const [result] = await salesDB.listAll();
  const getDate = async (id) => {
    const bruteDate = await salesDB.getDate(id);
    const [[{ date }]] = bruteDate;
    console.log(date.toJSON());
    return date.toJSON();
  };
  
  const resultModel = await Promise.all(result.map(async (sale) => ({
    saleId: sale.sale_id,
    productId: sale.product_id,
    quantity: sale.quantity,
    date: await getDate(sale.sale_id),
  })));
  res.status(200).json(resultModel);
});

app.get('/sales/:id', async (req, res) => {
  const { id } = req.params;
  const [result] = await salesDB.listById(id);
  const getDate = async (dateId) => {
    const bruteDate = await salesDB.getDate(dateId);
    const [[{ date }]] = bruteDate;
    return date.toJSON();
  };
  if (result.length > 0) {
    const resultModel = await Promise.all(result.map(async (sale) => ({
      productId: sale.product_id,
      quantity: sale.quantity,
      date: await getDate(sale.sale_id),
    })));
    res.status(200).json(resultModel);
  } else {
    console.log('Sale not found');
    res.status(404).json({ message: 'Sale not found' });
  }
});

app.post('/sales', validations.validateSaleTypos, validations.validateSale, async (req, res) => { 
  const newSale = req.body;
  const [{ insertId }] = await salesDB.insert(new Date());
  await Promise.all(newSale
    .map((eachProduct) => salesDB.insertSalesProducts(insertId, eachProduct)));
  const answerModel = {
    id: insertId,
    itemsSold: newSale,
  };
  res.status(201).json(answerModel);
});

app.put('/products/:id', validations.validateProducts, validations.validadeProductId,
  async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const [result] = await productsDB.update(id, name);
  // console.log(result.affectedRows);
  if (result.affectedRows !== 0) {
    res.status(200).json({
      id,
      name,
    });
  }
  });

app.delete('/products/:id', validations.validadeProductId,
  async (req, res) => {
    const { id } = req.params;
    const [result] = await productsDB.remove(id);
    console.log(result.affectedRows);
    if (result.affectedRows !== 0) {
      res.status(204).json({});
    }
  });

module.exports = app;
