import { User } from "./models/user.model.js";
import { USER_QUERY } from "./user.query.js";
import { getByKey } from "./service/get-by-key.js";
import { getFieldsAndValues } from "./service/get-fields-and-values.js";
import { JwtToken } from "../../lib/auth/jwt.token.js";
import { comparePassword } from "../../lib/password-encoder.js";
import pool from "./../../config/database.config.js";

class UserService {
  getUsers = async () => {
    try {
      const [rows] = await pool.query(USER_QUERY.GET_ALL);
      return rows.map((row) => new User(row));
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
    }
  };

  getUserById = async (id) => {
    try {
      return getByKey("id", id);
    } catch (error) {
      throw new Error("Error fetching user by id: " + error.message);
    }
  };

  createUser = async (user) => {
    try {
      const [fields, values] = await getFieldsAndValues(user);

      const [result] = await pool.query(USER_QUERY.INSERT_USER(fields), values);

      return { id: result.insertId, name: user.name, email: user.email };
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  };

  loginUser = async ({ email, password }) => {
    try {
      const user = getByKey("email", email);
      if (!user || !comparePassword(password, user.password)) {
        throw new Error("User not found");
      }

      return {
        id: user.id,
        token: JwtToken.generateToken({ id: user.id, email: user.email }),
      };
    } catch (error) {
      throw new Error("Error logging in user: " + error.message);
    }
  };

  updateUser = async (id, user) => {
    try {
      
      const [fields, values] = await getFieldsAndValues(user);
      values.push(id);
      console.log(fields);
      console.log(values);

      await pool.query(USER_QUERY.UPDATE_USER(fields), values);

      return this.getUserById(id);
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  };

  deleteUser = async (id) => {
    try {
      await pool.query(USER_QUERY.DELETE_USER, [id]);
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  };
}

export default UserService;
