export const USER_QUERY = {
  GET_ALL: "SELECT * FROM users",
  GET_BY_KEY: (key) => `SELECT * FROM users WHERE ${key} = ?`,
  INSERT_USER: (keys) => `
  INSERT INTO users (${keys.join(", ")})
  VALUES (${keys.map(() => "?").join(", ")})
`,
  UPDATE_USER: (keys) =>
    `UPDATE users SET ${keys.join(" = ?, ")} = ? WHERE id = ?`,
  DELETE_USER: "DELETE FROM users WHERE id = ?",
};
