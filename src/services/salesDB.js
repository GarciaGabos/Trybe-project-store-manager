const connection = require('./connection');

const listAll = () => connection.execute('SELECT * FROM sales_products');

const listById = (id) => connection.execute('SELECT * FROM sales_products WHERE sale_id = ?', [id]);

const getDate = (id) => connection.execute('SELECT date FROM sales WHERE id = ?', [id]);
module.exports = {
  listAll,
  listById,
  getDate,
};