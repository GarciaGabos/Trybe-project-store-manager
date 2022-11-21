const connection = require('./connection');

const listAll = async () => {
  const [result] = await connection.execute('SELECT * FROM sales_products');
  return result;
};

const listById = async (id) => {
  const [result] = await connection.execute('SELECT * FROM sales_products WHERE sale_id = ?', [id]);
  return result;
};

const getDate = async (id) => {
  const [[{ date }]] = await connection.execute('SELECT date FROM sales WHERE id = ?', [id]);
  return date;
};
const insert = async (date) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES(?)', [date],
  );
  return insertId;
};

const insertSalesProducts = async (id, newSale) => {
  const [result] = await connection.execute(
  `INSERT INTO sales_products
      (sale_id, product_id, quantity) VALUES (?, ?, ?)`, [id, newSale.productId, newSale.quantity],
  );
  return result;
};

module.exports = {
  listAll,
  listById,
  getDate,
  insert,
  insertSalesProducts,
};