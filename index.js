import express from "express";
import dotenv from "dotenv";

import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();
dotenv.config({ quiet: true });

const port = process.env.PORT || 3000;
app.use(express.json());
app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
