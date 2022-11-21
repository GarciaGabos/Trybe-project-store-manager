const productsModel = require('../models/products.model');

const getAllProducts = async () => {
  const result = await productsModel.listAll();
  console.log(result);
  return { type: null, message: result };
};

const getProductById = async (id) => {
  const result = await productsModel.listById(id);
  if (result) return { type: null, message: result };
  return { type: 'ERROR_404', message: { message: 'Product not found' } };
};

const postProduct = async (name) => {
  const result = await productsModel.insert(name);
  if (result) return { type: null, message: { id: result.insertId, name } };
  return { type: 'ERROR_404', message: { message: 'Product not found' } };
};

const updateProduct = async (id, name) => {
  const result = await productsModel.update(id, name);
  if (result.affectedRows !== 0) {
    return { type: null, message: { id, name } };
  } return { type: 'ERROR_404', message: { message: 'Product not found' } };
};

const removeProduct = async (id) => {
  const result = await productsModel.remove(id);
  console.log(result.affectedRows);
  if (result.affectedRows !== 0) {
    return { type: null, message: {} };
  } return { type: 'ERROR_404', message: { message: 'Product not found' } };
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  updateProduct,
  removeProduct,
};