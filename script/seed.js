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

    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
    User.create({ username: "tyler", password: "tyler" }),
    User.create({ username: "elstan", password: "elstan" }),
    User.create({ username: "ryan", password: "ryan" }),
    User.create({ username: "admin", password: "admin", type: "admin" }),
    
  ]);
  const alston = await User.create({ username: "alston", password: "alston" });

  // Creating Products
  const products = await Promise.all([
    Product.create({
       name: "Aglaonema",
       price: 2000,
       description: "These are evergreen perennials with stems growing erect or decumbent and creeping, known to bring luck in some asian cultures.",
       imageUrl: "https://thumbs.dreamstime.com/b/bright-living-room-aglaonema-maria-houseplant-chinese-evergreen-cuttings-red-glass-vase-front-white-wall-192366698.jpg"}),
    Product.create({
      name: "Aphelandra squarrosa",
      price: 2500,
      description:"Otherwise known as a Zebra Plant; This plant flourishes in abundant, but not direct, light. It does not bloom often, but it can be encouraged to bloom by prolonged daily exposure to light.",
      imageUrl: "https://thumbs.dreamstime.com/b/zebra-plant-aphelandra-squarrosa-ornamental-perennial-herb-dark-green-large-leaves-white-veins-foliage-sometimes-43522399.jpg" }),
    Product.create({
      name: "Bromeliaceae",
      price: 1800,
      description: "Bromeliads are plants that are adapted to various climates. Foliage takes different shapes, from needle-thin to broad and flat, symmetrical to irregular, spiky to soft. The foliage, which usually grows in a rosette, is widely patterned and colored.",
      imageUrl: "https://thumbs.dreamstime.com/b/bromeliad-flower-4951908.jpg"}),
    Product.create({
      name: "Calathea",
      price: 1600,
      description:"Otherwise known as a prayer plant; Calathea leaves are often large and colorfully patterned. The leaves are often variegated with bright colors such as pink, orange, red, and white.",
      imageUrl: "https://thumbs.dreamstime.com/b/calathea-prayer-plant-19391896.jpg"}),
    Product.create({
      name: "Chlorophytum comosum",
      price: 1500,
      description:"Otherwise known as a Spider Plant; The NASA Clean Air Study determined that this plant was effective at removing common household air toxins formaldehyde and xylene.",
      imageUrl: "https://thumbs.dreamstime.com/b/chlorophytum-comosum-also-known-spider-plant-airplane-plant-st-bernard-s-lily-spider-ivy-ribbon-plant-hen-chickens-139472681.jpg" }),
    Product.create({
      name: "Dypsis lutescens",
      price: 2100,
      description: "Otherwise known as a Yellow Palm; It is grown as an ornamental plant in gardens in tropical and subtropical regions, and elsewhere indoors as a houseplant. It has gained the Royal Horticultural Society's Award of Garden Merit.",
      imageUrl: "https://thumbs.dreamstime.com/b/areca-cane-palm-dypsis-lutescens-golden-cane-palm-plant-white-pot-areca-cane-palm-dypsis-lutescens-golden-cane-palm-plant-190248534.jpg" }),
    Product.create({
       name: "Dracaena Plant",
       price: 1900,
       description: "Many species of Dracaena are kept as houseplants due to tolerance of lower light and sparse watering.",
       imageUrl: "https://thumbs.dreamstime.com/b/dracaena-8392661.jpg" }),
    Product.create({
      name: "Ficus benjamina",
      price: 3000,
      description:"Otherwise known as a Weeping Fig, the Ficus is a species of flowering plant in the family Moraceae, native to Asia and Australia.",
      imageUrl: "https://thumbs.dreamstime.com/b/ficus-benjamina-29183594.jpg" }),
    Product.create({
      name: "Peperomia",
      price: 1600,
      description: "Otherwise known as a Waterlemon Plant; They are compact and usually do not exceed 30 cm (12 in) in height.",
      imageUrl: "https://thumbs.dreamstime.com/b/little-peperomia-ceramic-cup-white-background-61249206.jpg" }),
    Product.create({
      name: "Monstera Deliciosa",
      price: 2500,
      description: "Swiss cheese plant, is a species of flowering plant native to tropical forests of southern Mexico, south to Panama. It has been introduced to many tropical areas, and has become a mildly invasive species in Hawaii, Seychelles, Ascension Island and the Society Islands. It is very widely grown in temperate zones as a houseplant.",
      imageUrl:"https://thumbs.dreamstime.com/b/modern-retro-interior-modern-retro-interior-vintage-table-potted-plant-fruit-salad-tree-monstera-deliciosa-empty-white-wall-125603162.jpg"}),
    Product.create({
      name: "The Chaz",
      price: 800,
      description:"Typical Chaz, the cool blue pot.",
      imageUrl: "https://thumbs.dreamstime.com/b/empty-clay-pot-5507720.jpg",
      type: "pot"}),
    Product.create({
      name: "The Green Machine",
      price: 800,
      description: "Perfect for planting herbs and staying healthy!",
      imageUrl: "https://thumbs.dreamstime.com/b/empty-clay-pot-5507731.jpg",
      type: "pot" }),
    Product.create({
       name: "Plain Jane",
       price: 800,
       description: "Classic and elegant.",
       imageUrl: "https://thumbs.dreamstime.com/b/empty-clay-pot-4820259.jpg",
       type: "pot"}),
    Product.create({
      name: "(Little)Clifford",
      price: 800,
      description: "The (not so) big red pot.",
      imageUrl: "https://thumbs.dreamstime.com/b/empty-clay-pot-5507726.jpg",
      type: "pot" }),
    Product.create({
      name: "Baby Food",
      price: 800,
      description: "Description: Baby Food",
      imageUrl: "https://thumbs.dreamstime.com/b/empty-clay-pot-5507733.jpg",
      type: "pot" }),
    Product.create({
      name: "The Gladiator",
      price: 1000,
      description: "Throwback to the ancient Romans",
      imageUrl: "https://thumbs.dreamstime.com/b/small-rough-clay-plant-pot-7112136.jpg",
      type: "pot" }),
    Product.create({
      name: "The Potter",
      price: 1500,
      description: "Made by our own 8 hands.",
      imageUrl: "https://thumbs.dreamstime.com/b/blue-pottery-flower-pot-handmade-isolated-49245915.jpg",
      type: "pot" }),
    Product.create({
      name: "Potpeii",
      price: 1800,
      description: "May or may not belong in a museum.",
      imageUrl: "https://thumbs.dreamstime.com/b/clay-pot-6215097.jpg",
      type: "pot"}),
    Product.create({
       name: "Used and Abused",
       price: 300,
       description:"Sometimes you just need some cheap pot.",
       imageUrl: "https://thumbs.dreamstime.com/b/clay-pot-23845322.jpg",
       type: "pot" }),
    Product.create({
      name: "Plastic Pot",
      price: 800,
      description: "For those of you who don't care for the environement.",
      imageUrl:"https://thumbs.dreamstime.com/b/plant-pot-22414920.jpg",
      type: "pot" }),
    Product.create({
      name: "Garden Gi",
      price: 10000,
      description:"Protect your garden from unwelcome guests in our new Garden Gi!",
      imageUrl: "https://thumbs.dreamstime.com/b/forty-something-brunette-woman-wearing-wearing-karate-gi-standing-under-cherry-tree-doing-punch-stance-woman-fighting-105269686.jpg",
      type: "apparel"}),
    Product.create({
      name: "Ol' McDonalds Favorite Hat",
      price: 5000,
      description: "E I E I O.",
      imageUrl: "https://thumbs.dreamstime.com/b/gardening-hat-1227693.jpg",
      type: "apparel" }),
    Product.create({
      name: "Chic Hands",
      price: 2500,
      description: "Look good, feel good baby!",
      imageUrl: "https://thumbs.dreamstime.com/b/purple-gardening-gloves-13448714.jpg",
      type: "apparel"}),
    Product.create({
      name: "Starter Kit",
      price: 10000,
      description: "For all of our gardening noobs needs, get started with our one of a kind starter kit! Includes: Hat, Gloves,Watering Can, Gloves, Shovels, Pots, and a basket!",
      imageUrl: "https://thumbs.dreamstime.com/b/gardening-tools-straw-hat-grass-garden-36560448.jpg",
      type: "tool" })
  ]);

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
  const alstonOrder = await alston.createOrder({});
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
