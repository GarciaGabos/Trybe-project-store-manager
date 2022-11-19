const connection = require('./connection');

const listAll = () => connection.execute('SELECT * FROM sales_products');

const listById = (id) => connection.execute('SELECT * FROM sales_products WHERE sale_id = ?', [id]);

const getDate = (id) => connection.execute('SELECT date FROM sales WHERE id = ?', [id]);

const insert = (date) => connection.execute(
  `INSERT INTO sales
      (date) VALUES (?)`, [date],
);

const insertSalesProducts = (id, newSale) => connection.execute(
  `INSERT INTO sales_products
      (sale_id, product_id, quantity) VALUES (?, ?, ?)`, [id, newSale.productId, newSale.quantity],
);
module.exports = {
  listAll,
  listById,
  getDate,
  insert,
  insertSalesProducts,
};