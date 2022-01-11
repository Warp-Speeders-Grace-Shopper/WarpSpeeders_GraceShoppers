const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;

// all routes prepended with /api/projects
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.log(`error in the router.get route: ${error}`);
    next(error);
  }
});

router.get("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.json(product);
  } catch (error) {
    console.log(`error in the router.get route: ${error}`);
    next(error);
  }
});
