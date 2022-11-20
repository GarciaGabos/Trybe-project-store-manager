const productsDB = require('./productsDB');

const validateProducts = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: '"name" is required' });
  } 
  if (name.length < 5) {
    res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const validateSaleTypos = async (req, res, next) => {
  const newSales = req.body;
  const productIdKey = newSales
    .map((sale) => Object.prototype.hasOwnProperty.call(sale, 'productId'));
  if (productIdKey.includes(false)) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  const quantityKey = newSales
    .map((sale) => Object.prototype.hasOwnProperty.call(sale, 'quantity'));
  if (quantityKey.includes(false)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  const salesQuantity = newSales.map((sale) => sale.quantity);
  if (!salesQuantity.every((quantity) => quantity >= 1)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

const validadeProductId = async (req, res, next) => {
  const { id } = req.params;
  const [[result]] = await productsDB.listById(id);
  console.log(result);
  if (result === undefined) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next(); 
};

const validateSale = async (req, res, next) => {
  const newSales = req.body;
  const productId = newSales.map((sale) => sale.productId);
  const results = await Promise.all(productId
    .map(async (individualId) => {
      const [[result]] = await productsDB.listById(individualId);
      return result;
    }));
  try {
    const idArray = results.map((eachReturn) => eachReturn.id);
    console.log(idArray);
  } catch (err) {
    res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  validateProducts,
  validateSaleTypos,
  validateSale,
  validadeProductId,
};
