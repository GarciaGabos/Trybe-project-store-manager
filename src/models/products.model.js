const connection = require('./connection');

const listAll = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  return result;
};

const listById = async (id) => {
  const [[result]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return result;
};

const insert = async (name) => {
  const [result] = await connection.execute(
    `INSERT INTO products
      (name) VALUES (?)`,
    [name],
  );
  console.log(result);
  return result;
};

const update = async (id, name) => {
  const [result] = await connection.execute(
    `UPDATE products SET
      name = ? WHERE id = ?`,
    [name, id],
  );
  return result;
};
const remove = async (id) => {
  const [result] = await connection.execute('DELETE FROM products WHERE id = ?', [id]);
  console.log(result);
  return result;
};
module.exports = {
  listAll,
  listById,
  insert,
  update,
  remove,
};