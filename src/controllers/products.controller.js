const productsService = require('../services/products.service');
const errorMap = require('./errorMap');

const listAll = async (_req, res) => {
  const result = await productsService.getAllProducts();
  if (result.type) return res.status(errorMap.mapError(result.type)).json(result.message);
  res.status(200).json(result.message);
};

const listById = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.getProductById(id);
  if (result.type) return res.status(errorMap.mapError(result.type)).json(result.message);
  res.status(200).json(result.message);
};
  
const postProduct = async (req, res) => {
  const { name } = req.body;
  const result = await productsService.postProduct(name);
  if (result.type) return res.status(errorMap.mapError(result.type)).json(result.message);
  res.status(201).json(result.message);
};

const putProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await productsService.updateProduct(id, name);
  if (result.type) res.status(errorMap.mapError(result.type)).json(result.message);
  else res.status(200).json(result.message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.removeProduct(id);
  if (result.type) res.status(errorMap.mapError(result.type)).json(result.message);
  else res.status(204).json(result.message);
};

module.exports = {
  listAll,
  listById,
  postProduct,
  putProduct,
  deleteProduct,
};
