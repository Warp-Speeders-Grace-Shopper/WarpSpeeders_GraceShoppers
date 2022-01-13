const router = require("express").Router();
const {
  models: { User, Order },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// all routes in this file prepended with /api/users
// so this can be reached via [project]/api/users/:userId/orders
router.get("/:userId/orders", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      // find all orders in db where userId matches the :userId url param
      where: { userId: req.params.userId },
    });
    res.send(orders);
  } catch (error) {
    console.log(
      `error in router.get route /api/users/:userId/orders: ${error}`
    );
    next(error);
  }
});

router.get("/:userId/cart", async (req, res, next) => {
  try {
    const cart = await Order.findAll({
      // find one order for this user with status of "open"
      where: { userId: req.params.userId, status: "open" },
    });
    if (cart.length > 1)
      console.log(`warning: more than one open order for this user found!`);
    res.send(cart);
  } catch (error) {
    console.log(
      `error in router.get route /api/users/:userId/orders: ${error}`
    );
    next(error);
  }
});
