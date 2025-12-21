import { Product } from "./models/product.model.js";
import pool from "./../../config/database.config.js";

class ProductService {
  getProducts = async () => {
    const [rows] = await pool.query("SELECT * FROM products");
    return rows.map((row) => new Product(row));
  };

  getProductById = async (productId) => {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
      productId,
    ]);
    return rows.length ? new Product(rows[0]) : null;
  };

  createProduct = async (product) => {
    const { name, description, price, stock } = product;
    const [result] = await pool.query(
      "INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)",
      [name, description, price, stock]
    );
    return new Product({ id: result.insertId, ...product });
  };

  updateProduct = async (productId, product) => {
    const values = [];
    const fields = [];
    const allowedFields = ["name", "description", "price", "stock"];

    for (const key of allowedFields) {
      if (product[key]) {
        fields.push(`${key} = ?`);
        values.push(product[key]);
      }
    }
    values.push(productId);

    const sql = `UPDATE products SET ${fields.join(", ")} WHERE id = ?`;
    await pool.query(sql, values);
    return this.getProductById(productId);
  };

  deleteProduct = async (productId) => {
    await pool.query("DELETE FROM products WHERE id = ?", [productId]);
  };
}

export default ProductService;
