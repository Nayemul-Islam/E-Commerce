import { COMMON_QUERY } from "../../constant/common-query.constant.js";

const TABLE_NAME = "products";

export const PRODUCT_QUERY = {
  GET_ALL: COMMON_QUERY.GET_ALL(TABLE_NAME),
  GET_BY_KEY: (key) => COMMON_QUERY.GET_BY_KEY(TABLE_NAME, key),
  INSERT_PRODUCT: (keys) => COMMON_QUERY.INSERT(TABLE_NAME, keys),
  UPDATE_PRODUCT: (keys) => COMMON_QUERY.UPDATE(TABLE_NAME, keys),
  DELETE_PRODUCT: COMMON_QUERY.DELETE(TABLE_NAME),
};
