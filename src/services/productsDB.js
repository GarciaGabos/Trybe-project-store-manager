const connection = require('./connection');

const listAll = () => connection.execute('SELECT * FROM products');

const listById = (id) => connection.execute('SELECT * FROM products WHERE id = ?', [id]);

const insert = (name) => connection.execute(
  `INSERT INTO products
      (name) VALUES (?)`,
  [name],
);

module.exports = {
  listAll,
  listById,
  insert,
};