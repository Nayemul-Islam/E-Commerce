import express from "express";
import dotenv from "dotenv";

import userRoutes from "./modules/user/user.routes.js";
import productRoutes from "./modules/product/product.routes.js"

const app = express();
dotenv.config({ quiet: true });

const port = process.env.PORT || 3000;
app.use(express.json());

app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
