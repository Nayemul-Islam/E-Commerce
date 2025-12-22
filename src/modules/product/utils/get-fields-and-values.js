export const getFieldsAndValues = (product) => {
  const fields = [];
  const values = [];
  const allowedFields = ["name", "price", "description", "stock"];
  for (const key of allowedFields) {
    if (product[key]) {
      fields.push(`${key}`);
      values.push(product[key]);
    }
  }
  return [fields, values];
};
