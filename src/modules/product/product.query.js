export const PRODUCT_QUERY = {
  GET_ALL: "SELECT * FROM products",
  GET_BY_KEY: (key) => `SELECT * FROM products WHERE ${key} = ?`,
  INSERT_PRODUCT: (keys) =>
    `INSERT INTO products (${keys.join(", ")}) 
     VALUES (${keys.map(() => "?").join(", ")})`,
  UPDATE_PRODUCT: (keys) =>
    `UPDATE products SET ${keys.join(" = ?, ")} = ? WHERE id = ?`,
  DELETE_PRODUCT: `DELETE FROM products WHERE id = ?`,
};
