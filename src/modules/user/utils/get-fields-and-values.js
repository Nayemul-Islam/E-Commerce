import { encryptPassword } from "../../../lib/password-encoder.js";

export const getFieldsAndValues = async (user) => {
  const values = [];
  const fields = [];
  const allowedFields = ["name", "email", "password"];

  for (const key of allowedFields) {
    if (user[key]) {
      fields.push(`${key}`);
      if (key !== "password") {
        values.push(user[key]);
      } else {
        try {
          values.push(await encryptPassword(user[key]));
        } catch (error) {
          throw new Error("Error encrypting password: " + error.message);
        }
      }
    }
  }
  return [fields, values];
};
