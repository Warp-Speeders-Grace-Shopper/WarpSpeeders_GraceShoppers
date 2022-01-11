const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: "A wonderful, high-quality item from our selection.",
  },
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
    defaultValue:
      "https://cdn2.vectorstock.com/i/1000x1000/30/61/plant-pot-cartoon-isolated-vector-24833061.jpg",
  },
});

module.exports = Product;
