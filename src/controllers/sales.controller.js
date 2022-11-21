const salesService = require('../services/sales.service');
const errorMap = require('./errorMap');

const getAllSales = async (_req, res) => {
  const result = await salesService.getAllSales();
  if (result.type) return res.status(errorMap.mapError(result.type)).json(result.message);
  res.status(200).json(result.message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.getSaleById(id);
  if (result.type) res.status(errorMap.mapError(result.type)).json(result.message);
  res.status(200).json(result.message);
};

const postSale = async (req, res) => {
  const newSale = req.body;
  const result = await salesService.addNewSale(newSale);
  if (result.type) res.status(errorMap.mapError(result.type)).json(result.message);
  res.status(201).json(result.message);
};

module.exports = {
  getAllSales,
  getSaleById,
  postSale,
};