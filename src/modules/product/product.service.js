import { Product } from "./models/product.model.js";
import pool from "./../../config/database.config.js";
import { PRODUCT_QUERY } from "./product.query.js";
import { getFieldsAndValues } from "./utils/get-fields-and-values.js";
import { getByKey } from "./service/product-get-by-key.service.js";

class ProductService {
  async getProducts() {
    try {
      const [rows] = await pool.query(PRODUCT_QUERY.GET_ALL);

      return rows.map((row) => new Product(row));
    } catch (error) {
      throw new Error("Error fetching products: " + error.message);
    }
  }

  async getProductById(productId) {
    try {
      return await getByKey("id", productId);
    } catch (error) {
      throw new Error("Error fetching product by id: " + error.message);
    }
  }

  async createProduct(product) {
    try {
      const [fields, values] = getFieldsAndValues(product);
      const [result] = await pool.query(
        PRODUCT_QUERY.INSERT_PRODUCT(fields),
        values
      );

      return new Product({ id: result.insertId, ...product });
    } catch (error) {
      throw new Error("Error adding product " + error.message);
    }
  }

  async updateProduct(productId, product) {
    try {
      const [fields, values] = getFieldsAndValues(product);
      values.push(productId);
      await pool.query(PRODUCT_QUERY.UPDATE_PRODUCT(fields), values);

      return await this.getProductById(productId);
    } catch (error) {
      throw new Error("Error updating product:" + error.message);
    }
  }

  async deleteProduct(productId) {
    try {
      await pool.query(PRODUCT_QUERY.DELETE_PRODUCT, [productId]);
    } catch (error) {
      throw new Error("Error deleting product : " + error.message);
    }
  }
}

export default ProductService;
