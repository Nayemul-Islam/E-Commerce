import pool from "../config/database.js";
import { Product } from "../models/product.model.js";
class ProductService {
  async getProducts() {
    const [rows] = await pool.query("SELECT * FROM products");
    return rows.map((row) => new Product(row));
  }
  async getProductById(productId) {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
      productId,
    ]);
    return rows.length ? new Product(rows[0]) : null;
  }
  async createProduct(product) {
    console.log(product);
    const { name, description, price, stock } = product;
    const [result] = await pool.query(
      "INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)",
      [name, description, price, stock]
    );
    return new Product({ id: result.insertId, ...product });
  }
  async updateProduct(productId, product) {
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
  }

  async deleteProduct(productId) {
    await pool.query("DELETE FROM products WHERE id = ?", [productId]);
  }
}

export const productService = new ProductService();
