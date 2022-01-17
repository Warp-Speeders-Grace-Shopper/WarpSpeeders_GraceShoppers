const router = require('express').Router();
const {
  models: { Product },
} = require('../db');
module.exports = router;

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.log(`error in the router.get route: ${error}`);
    next(error);
  }
});

// GET /api/products/:productId
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.json(product);
  } catch (error) {
    console.log(`error in the router.get route: ${error}`);
    next(error);
  }
});

// POST /api/products/
router.post('/', async (req, res, next) => {
  try {
    console.log('Adding product', req.body);
    res.status(201).send(await Product.create(req.body));
  } catch (error) {
    console.log(`error in the router.post route: ${error}`);
    next(error);
  }
});

// DELETE /api/products/:productId
router.delete('/:productId', async (req, res, next) => {
  try {
    console.log('Deleting product');
    const product = await Product.findByPk(req.params.productId);
    await product.destroy();
    res.send(product);
  } catch (error) {
    console.log(`error in the router.delete route: ${error}`);
    next(error);
  }
});

// PUT /api/products/:productId
router.put('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    const updatedProduct = await product.update(req.body);
    res.send(updatedProduct);
  } catch (error) {
    console.log(`error in the router.put route: ${error}`);
    next(error);
  }
});
