const Sequelize = require("sequelize");
const db = require("../db");

const Order_Product = db.define("Order_Product", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  checkoutPrice: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Order_Product;
