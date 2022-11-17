const express = require('express');
const productsDB = require('./services/productsDB');
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

module.exports = app;