const express = require('express');
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

module.exports = app;

// [
//   {
//     "sale_id": 1,
//     "product_id": 1,
//     "quantity": 5
//   },
//   {
//     "sale_id": 1,
//     "product_id": 2,
//     "quantity": 10
//   },
//   {
//     "sale_id": 2,
//     "product_id": 3,
//     "quantity": 15
//   }
// ]