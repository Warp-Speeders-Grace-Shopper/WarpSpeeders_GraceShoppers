//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const Order_Product = require("./models/Order_Product");

/*
 * User:Order 1:1 
 * Order:User 1:1
 * Order:Product M:M
 * Product:Order M:M
 */

Order.belongsTo(User)
User.hasOne(Order)
Product.belongsToMany(Order, { through: Order_Product })
Order.belongsToMany(Product, { through: Order_Product })


module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    Order_Product
  },
};
