import pool from "../../../config/database.config.js";
import { User } from "../models/user.model.js";
import { USER_QUERY } from "../user.query.js";

export const getByKey = async (key, value) => {
  const allowedFields = ["id", "email", "name"];

  if (!allowedFields.includes(key)) throw new Error("key dosen't exists");

  try {
    const [rows] = await pool.query(USER_QUERY.GET_BY_KEY(key), [value]);

    return rows[0] ? new User(rows[0]) : null;
  } catch (error) {
    throw new Error("Error fetching user by key: " + error.message);
  }
  
};
