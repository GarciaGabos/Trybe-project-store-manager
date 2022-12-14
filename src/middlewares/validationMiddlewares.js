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

module.exports = {
  validateProducts,
  validateSaleTypos,
};
