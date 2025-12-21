import ProductService from "./product.service.js";

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  getProducts = async (req, res) => {
    try {
      const products = await this.productService.getProducts();
      res.json(products);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
      const product = await this.productService.getProductById(productId);
      res.json(product);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  createProduct = async (req, res) => {
    try {
      const product = await this.productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await this.productService.updateProduct(
        productId,
        req.body
      );
      res.json(product);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      await this.productService.deleteProduct(productId);
      res.status(204).send();
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };
}

export default ProductController;
