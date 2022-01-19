const router = require('express').Router();
const {
  models: { Product },
} = require('../db');
module.exports = router;
const { requireToken } = require('../app');

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
router.post('/', requireToken, async (req, res, next) => {
  if (req.user.type != 'admin') {
    res.status(403).send('You must be an admin to update product inventory.');
  }
  try {
    console.log('Adding product', req.body);
    res.status(201).send(await Product.create(req.body));
  } catch (error) {
    console.log(`error in the router.post route: ${error}`);
    next(error);
  }
});

// DELETE /api/products/:productId
router.delete('/:productId', requireToken, async (req, res, next) => {
  if (req.user.type != 'admin') {
    res.status(403).send('You must be an admin to update product inventory.');
  }
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
router.put('/:productId', requireToken, async (req, res, next) => {
  if (req.user.type != 'admin') {
    res.status(403).send('You must be an admin to update product inventory.');
  }
  try {
    const product = await Product.findByPk(req.params.productId);
    const updatedProduct = await product.update(req.body);
    res.send(updatedProduct);
  } catch (error) {
    console.log(`error in the router.put route: ${error}`);
    next(error);
  }
});
