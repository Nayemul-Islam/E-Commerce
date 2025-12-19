export const USER_QUERY = {
  GET_ALL: "SELECT * FROM users",
  GET_BY_KEY: (key) => `SELECT * FROM users WHERE ${key} = ?`,
};
