'use strict';

const {
  db,
  models: { User, Product, Order, Order_Product },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
    User.create({ username: 'tyler', password: 'tyler' }),
    User.create({ username: 'elstan', password: 'elstan' }),
    User.create({ username: 'alston', password: 'alston' }),
    User.create({ username: 'ryan', password: 'ryan' }),
  ]);

  // Creating Products
  const products = [];
  for (let i = 0; i < 25; i++) {
    let product = await Product.create({
      name: `Plant${i}`,
      price: i,
    });
    products.push(product);
  }

  // Create Orders for Users, add Products to Orders

  // Baseline -- few items, single item added x2
  const tylerUser = await User.findOne({ where: { username: 'tyler' } });
  const tylerOrder = await tylerUser.createOrder({});
  const tylerOrderTwo = await tylerUser.createOrder({ status: 'complete' });
  const tylerOrderThree = await tylerUser.createOrder({ status: 'complete' });
  await tylerOrder.addProduct(products[0]);
  await tylerOrder.addProduct(products[1]);
  // Many items
  const elstanUser = await User.findOne({ where: { username: 'elstan' } });
  const elstanOrder = await elstanUser.createOrder({});
  await elstanOrder.addProduct(products[23]);
  await elstanOrder.addProduct(products[22]);
  await elstanOrder.addProduct(products[16]);
  await elstanOrder.addProduct(products[15]);
  await elstanOrder.addProduct(products[9]);
  await elstanOrder.addProduct(products[8]);
  await elstanOrder.addProduct(products[3]);
  await elstanOrder.addProduct(products[1]);
  // Single item, added with qty >> 1 and checkoutPrice
  const alstonUser = await User.findOne({ where: { username: 'alston' } });
  const alstonOrder = await alstonUser.createOrder({});
  await alstonOrder.addProduct(products[7], {
    through: { quantity: 6, checkoutPrice: products[7].price },
  });
  // No items
  const ryanUser = await User.findOne({ where: { username: 'ryan' } });
  const ryanOrder = await ryanUser.createOrder({});
  // User with complete order and active order
  const murphyUser = await User.findOne({ where: { username: 'murphy' } });
  const murphyOrder = await murphyUser.createOrder({ status: 'complete' });
  await murphyOrder.addProduct(products[0]);
  await murphyOrder.addProduct(products[1]);
  const murphyOrder2 = await murphyUser.createOrder();
  await murphyOrder2.addProduct(products[3]);
  await murphyOrder2.addProduct(products[5]);

  console.log(
    `seeded ${users.length} users\nseeded ${products.length} products`
  );
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
