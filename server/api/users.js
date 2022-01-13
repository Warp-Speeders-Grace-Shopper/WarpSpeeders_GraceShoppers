const router = require("express").Router();
const {
  models: { User, Order, Product, Order_Product },
} = require("../db");
module.exports = router;
const { red, yellow, cyan, green } = require("chalk");

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
    if (cart.length > 1) {
      //give us a warning if a user ever has more than one "cart" - maybe we'd merge them together just to be safe?
      console.log(
        red(`warning: more than one open order for this user found!`)
      );
    }

    const currentCartContents = await cart[0].getProducts();
    const count = await cart[0].countProducts();
    //not used^ but could come in handy

    res.send(currentCartContents);
  } catch (error) {
    console.log(
      `error in router.get route /api/users/:userId/orders: ${error}`
    );
    next(error);
  }
});

router.post("/:userId/addToCart", async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;
    // console.log(red(`grabbed productId of ${productId}`));
    //grab productId and quantity from the request body. this is extensible to handle additional options

    const currentUserCart = await Order.findOne({
      where: { userId: req.params.userId, status: "open" },
    });
    // console.log(cyan(`grabbed currentUserCard of:`));
    // console.dir(currentUserCart);
    // grab current User Cart (same as GET /:userId/cart)

    const currentProduct = await Product.findByPk(productId);
    // console.log(yellow(`currentProduct grabbed as:`));
    // console.dir(currentProduct);

    try {
      await currentUserCart.addProduct(currentProduct, {
        through: { quantity },
      });
    } catch (error) {
      console.log(red(`failed to addProduct! ${error}`));
    }

    res
      .status(200)
      //returns an array describing the cart contents
      // .json(
      //   await currentUserCart.getProducts({
      //     attributes: ["id", "name", "price"],
      //   })
      // );

      //return the object that was added to the cart. this helps the action/thunk work correctly.
      .json({ currentProduct, quantity });
  } catch (error) {
    console.log(red(`error in router.post for addToCart: ${error}`));
    next(error);
  }
});
