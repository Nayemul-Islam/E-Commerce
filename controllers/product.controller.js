import { productService } from "../services/product.service.js";
class ProductController {
  async getProducts(req, res) {
    try {
      const products = await productService.getProducts();
      res.json(products);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  async getProductById(req, res) {
    const productId = req.params.id;
    try {
      const product = await productService.getProductById(productId);
      res.json(product);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  async createProduct(req, res) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  async updateProduct(req, res) {
    const productId = req.params.id;
    try {
      const product = await productService.updateProduct(productId, req.body);
      res.json(product);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  async deleteProduct(req, res) {
    const productId = req.params.id;
    try {
      await productService.deleteProduct(productId);
      res.status(204).send();
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }
}

export const productController = new ProductController();
