import bcrypt from "bcryptjs";
import { JwtToken } from "../../../auth/jwt.token.js";
import pool from "../../../config/database.config.js";
import { User } from "./models/user.model.js";
import { USER_QUERY } from "../../../query/user.query.js";

class UserService {
  async getUsers() {
    const [rows] = await pool.query(USER_QUERY.GET_ALL);
    return rows.map((row) => new User(row));
  }

  getByKey(key, value) {
    const allowedFields = ["id", "email", "name"];
    if (!allowedFields.includes(key)) throw new Error("key dosen't exists");
    return pool.query(USER_QUERY.GET_BY_KEY(key), [value]);
  }

  getFieldsAndValues(user) {

    const values = [];
    const fields = [];
    const allowedFields = ["name", "email", "password"];

    for (const key of allowedFields) {

      if (user[key]) {
        fields.push(`${key} = ?`);

        values.push(key === "password" ?  user[key]);
      }
    }
    return [fields, values];
  }

  async getUserById(id) {
    const [rows] = await this.getByKey("id", id);
    return rows[0] ? new User(rows[0]) : null;
  }

  async getUserByEmail(email) {
    const [rows] = await this.getByKey("email", email);
    return rows[0] || null;
  }

  async createUser(user) {
    const { name, email, password } = user;
    const hashPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashPassword]
    );
    return { id: result.insertId, name, email };
  }

  async loginUser({ email, password }) {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    return {
      id: user.id,
      token: JwtToken.generateToken({ id: user.id, email: user.email }),
    };
  }

  async updateUser(id, user) {
    const values = [];
    const fields = [];

    if (user.name) {
      fields.push("name = ?");
      values.push(user.name);
    }
    if (user.email) {
      fields.push("email = ?");
      values.push(user.email);
    }
    if (user.password) {
      const hashPassword = await bcrypt.hash(user.password, 10);
      fields.push("password = ?");
      values.push(hashPassword);
    }
    values.push(id);
    const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    await pool.query(sql, values);

    return this.getUserById(id);
  }

  async deleteUser(id) {
    await pool.query("DELETE FROM users WHERE id = ?", [id]);
  }
}
export const userService = new UserService();
