export const COMMON_QUERY = {
  GET_ALL: (tableName) => `
    SELECT 
      * 
    FROM 
      ${tableName};
  `,
  GET_BY_KEY: (tableName, key) => `
    SELECT 
      * 
    FROM 
      ${tableName} 
    WHERE 
      ${key} = ?
  `,
  INSERT: (tableName, keys) =>
    `
      INSERT INTO 
          ${tableName} (${keys.join(", ")})
      VALUES (${keys.map(() => "?").join(", ")})
    `,
  UPDATE: (tableName, keys) => `
      UPDATE 
         ${tableName} 
      SET
         ${keys.join(" = ?, ")} = ? 
      WHERE 
         id = ?
  `,
  DELETE: (tableName, key = "id") => `
    DELETE 
    FROM 
      ${tableName} 
    WHERE 
      ${key} = ?;
  `,
};
