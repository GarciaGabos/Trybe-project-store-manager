const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');

const getDate = async (dateId) => {
  const date = await salesModel.getDate(dateId);
  return date.toJSON();
};

const getAllSales = async () => {
  const result = await salesModel.listAll();
  const resultModel = await Promise.all(result.map(async (sale) => ({
    saleId: sale.sale_id,
    productId: sale.product_id,
    quantity: sale.quantity,
    date: await getDate(sale.sale_id),
  })));
  return { type: null, message: resultModel };
};

const getSaleById = async (id) => {
  const result = await salesModel.listById(id);
  if (result.length > 0) {
    const resultModel = await Promise.all(result.map(async (sale) => ({
      productId: sale.product_id,
      quantity: sale.quantity,
      date: await getDate(sale.sale_id),
    })));
    return { type: null, message: resultModel };
  }
  return { type: 'ERROR_404', message: { message: 'Sale not found' } };
};

const addNewSale = async (newSale) => {
  const productId = newSale.map((sale) => sale.productId);
  const result = await Promise.all(productId.map(async (individualId) =>
    productsModel.listById(individualId)));
  
  if (result.includes(undefined)) {
    return { type: 'ERROR_404', message: { message: 'Product not found' } };
  }
  
  const insertId = await salesModel.insert(new Date());
  await Promise.all(newSale
      .map(async (eachProduct) => salesModel.insertSalesProducts(insertId, eachProduct)));
        const answerModel = {
          id: insertId,
          itemsSold: newSale,
        };
      return { type: null, message: answerModel };
};

module.exports = {
  getAllSales,
  getSaleById,
  addNewSale,
};
