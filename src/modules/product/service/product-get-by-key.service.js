import { Product } from "../models/product.model.js";
import pool from "./../../../config/database.config.js";
import { PRODUCT_QUERY } from "./../product.query.js";

export const getByKey = async (key, value) => {
  try {
    const allowedFields = ["id", "name"];

    if (!allowedFields.includes(key)) throw new Error("key dosen't exists");
    const [rows] = await pool.query(PRODUCT_QUERY.GET_BY_KEY(key), [value]);

    return rows[0] ? new Product(rows[0]) : null;
  } catch (error) {
    throw new Error("Error fetching product by key: " + error.message);
  }
};
