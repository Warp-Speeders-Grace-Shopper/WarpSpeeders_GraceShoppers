const router = require('express').Router();
const {
  models: { User, Order, Product, Order_Product },
} = require('../db');
module.exports = router;

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
      // give us a warning if a user ever has more than one "cart" - maybe we'd merge them together just to be safe?
      console.log(`warning: more than one open order for this user found!`);
    }

    if (!cart[0]) {
      res.sendStatus(204);
      // if the user has no cart, just return 204 (no content)
    } else {
      const currentCartContents = await cart[0].getProducts();
      // if they do have a cart, get its products and send them as response
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
    // get productId and quantity from req body; userId from URL param:
    const { productId, quantity = 1 } = req.body;
    const { userId } = req.params;

    // find current user's cart in db:
    let currentUserOrder = await Order.findOne({
      where: { userId, status: 'open' },
    });

    // if they don't have a cart, create one: (similar to GET /:userId/cart)
    if (!currentUserOrder) {
      currentUserOrder = await Order.create({ userId, status: 'open' });
    }
    // note: findOrCreate() should be a substitute for the above two actions, but it's not working.

    const currentProduct = await Product.findByPk(productId);
    // console.log(`currentProduct grabbed as:`);
    // console.dir(currentProduct);

    // console.log(Object.keys(currentUserOrder.__proto__));
    // need to add an IF statement:
    // if (await currentUserOrder.hasProduct(productId)) {
    //   console.log(
    //     `looks like that item is already in your cart. incrementing...`
    //   );
    //   const user = awaitUser.findByPk(userId)
    //   const orderProductRow = Order_Product.findOne({where: {productId}})
    //   // const products = await currentUserOrder.getProducts(
    //   //   {
    //   //     where: { id: productId },
    //   //   },
    //   //   { include: Order_Product }
    //   // );
    //   console.dir(products[0]);
    //   const currentProduct = products[0];
    //   await currentProduct.update({Order_Product:{quantity:}})
    //   const currentProduct = products[0];
    //   const orders = await currentProduct.getOrders();
    //   const orderInCart = await orders[0].Order_Product;
    //   console.dir(orderInCart);
    //   console.log(Object.keys(orderInCart.__proto__));
    //   await orderInCart.increment('quantity');
    // }

    // add qty of currentProduct to current user's order in db
    await currentUserOrder.addProduct(currentProduct, {
      through: { quantity },
    });

    const productAddedToCart = await currentUserOrder.getProducts({
      where: { id: productId },
    });
    // this back and forth is just to double-check, can probably remove later

    res.status(200).send(productAddedToCart[0]);
    //return the actual object that was added to the cart. this helps the action/thunk work correctly.
  } catch (error) {
    console.log(`error in router.post for addToCart: ${error}`);
    next(error);
  }
});

router.delete('/:userId/clearCart', async (req, res, next) => {
  const { userId } = req.params;
  try {
    // get user's cart from db:
    const cart = await Order.findOne({
      where: { userId, status: 'open' },
    });
    // destroy the cart and send status 200 (success)
    await cart.destroy();
    res.sendStatus(200);
  } catch (error) {
    console.log(`error in the router.delete ClearCart API route: `, error);
    next(error);
  }
});

router.delete('/:userId/removeFromCart/:itemId', async (req, res, next) => {
  try {
    const { userId, itemId } = req.params;

    // get user's cart from db:
    const cart = await Order.findOne({
      where: { userId, status: 'open' },
    });

    //use magic method to remove product
    await cart.removeProduct(itemId);
    // console.log(Object.keys(cart.__proto__));   <----- magic method checker

    res.status(200).send(itemId);
  } catch (error) {
    console.log(
      `error in the router.delete route to remove items from cart: ${error}`
    );
    next(error);
  }
});
