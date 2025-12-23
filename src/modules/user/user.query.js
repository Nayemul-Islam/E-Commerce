import { COMMON_QUERY } from "../../constant/common-query.constant.js";

const TABLE_NAME = "users";
export const USER_QUERY = {
  GET_ALL: COMMON_QUERY.GET_ALL(TABLE_NAME),
  GET_BY_KEY: (key) => COMMON_QUERY.GET_BY_KEY(TABLE_NAME, key),
  INSERT_USER: (keys) => COMMON_QUERY.INSERT(TABLE_NAME, keys),
  UPDATE_USER: (keys) => COMMON_QUERY.UPDATE(TABLE_NAME, keys),
  DELETE_USER: COMMON_QUERY.DELETE(TABLE_NAME),
};
