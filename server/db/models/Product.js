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
      "https://png.pngtree.com/png-vector/20190130/ourlarge/pngtree-hand-drawn-noise-illustration-green-potted-plant-green-leaf-design-element-png-image_609728.jpg",
  },
  type: {
    type: Sequelize.ENUM("plant", "pot", "tool", "apparel"),
    defaultValue: "plant"
  }
});

module.exports = Product;
