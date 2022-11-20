const connection = require('./connection');

const listAll = () => connection.execute('SELECT * FROM products');

const listById = (id) => connection.execute('SELECT * FROM products WHERE id = ?', [id]);

const insert = (name) => connection.execute(
  `INSERT INTO products
      (name) VALUES (?)`,
  [name],
);

const update = (id, name) => connection.execute(
  `UPDATE products SET
      name = ? WHERE id = ?`,
  [name, id],
);

const remove = (id) => connection.execute('DELETE FROM products WHERE id = ?', [id]);
module.exports = {
  listAll,
  listById,
  insert,
  update,
  remove,
};