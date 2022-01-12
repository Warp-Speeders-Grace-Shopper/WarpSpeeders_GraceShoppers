const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  status: {
    type: Sequelize.ENUM("open", "complete"),
    defaultValue: "open",
  },
  // Payment info
});

module.exports = Order;
