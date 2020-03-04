const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  // need an inventory as a field
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    unique: true
  },
  price: {
    // pennies -> integer over decimal
    // getter method here in order to just divide by 100
    type: Sequelize.DECIMAL(100, 2)
    // relevant validations?
    // cannot allow < 0 =>  have a minimum
    // optionally have a maximum
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  imageUrl: {
    // also validation for isUrl
    // default value -> you will be displaying this in the frontend anyway
    type: Sequelize.STRING
  }
})

module.exports = Product
