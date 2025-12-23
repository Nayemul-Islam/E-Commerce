import { Router } from "express";
import ProductController from "./product.controller.js";

const productController = new ProductController();
const router = Router();

router.get("/", productController.getProducts);

router.get("/:id", productController.getProductById);

router.post("/", productController.createProduct);

router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

export default router;
