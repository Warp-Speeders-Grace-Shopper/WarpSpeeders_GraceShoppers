const router = require('express').Router();
const {
  models: { User, Order, Product, Order_Product },
} = require('../db');
module.exports = router;
const { red, yellow, cyan, green } = require('chalk');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// all routes in this file prepended with /api/users
// so this can be reached via [project]/api/users/:userId/orders
router.get('/:userId/orders', async (req, res, next) => {
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

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const cart = await Order.findAll({
      // find one order for this user with status of "open"
      where: { userId: req.params.userId, status: 'open' },
    });
    if (cart.length > 1) {
      //give us a warning if a user ever has more than one "cart" - maybe we'd merge them together just to be safe?
      console.log(
        red(`warning: more than one open order for this user found!`)
      );
    }

    if (!cart[0]) {
      res.sendStatus(204);
      // if the user has no cart, just return 204 (no content)
    } else {
      const currentCartContents = await cart[0].getProducts();
      //if they do have a cart, get its products and send them as response
      res.send(currentCartContents);
    }
  } catch (error) {
    console.log(
      `error in router.get route /api/users/:userId/orders: ${error}`
    );
    next(error);
  }
});

router.post('/:userId/addToCart', async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const { userId } = req.params;
    console.log(
      red(`grabbed productId of ${productId}, quantity of ${quantity}`)
    );
    //grab productId and quantity from the request body. this is extensible to handle additional options

    let currentUserOrder = await Order.findOne({
      where: { userId, status: 'open' },
    });
    console.log(cyan(`grabbed currentUserOrder of:`));
    console.dir(currentUserOrder);

    if (!currentUserOrder) {
      currentUserOrder = await Order.create({ userId, status: 'open' });
    }
    // grab current User Cart (same as GET /:userId/cart)

    const currentProduct = await Product.findByPk(productId);
    // console.log(yellow(`currentProduct grabbed as:`));
    // console.dir(currentProduct);

    // need to add an IF statement:
    // if the product already exists in the cart, currentItemInCart.increment('quantity')
    // if it doesn't, continue with this line below:
    await currentUserOrder.addProduct(currentProduct, {
      through: { quantity },
    });

    const productAddedToCart = await currentUserOrder.getProducts({
      where: { id: productId },
    });
    // this back and forth ensures we don't send the http response to the user
    // until we know the db update is complete

    res
      .status(200)

      //return the object that was added to the cart. this helps the action/thunk work correctly.
      .send(productAddedToCart[0]);
  } catch (error) {
    console.log(red(`error in router.post for addToCart: ${error}`));
    next(error);
  }
});

router.delete('/:userId/clearCart', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const cart = await Order.findOne({
      where: { userId, status: 'open' },
    });
    await cart.destroy();
    console.log(`cart destroyed.`);
    res.sendStatus(200);
  } catch (error) {
    console.log(red(`error in the router.delete ClearCart API route: `), error);
    next(error);
  }
});
