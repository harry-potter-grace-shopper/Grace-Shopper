const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  productsId: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  totalCost: {
    type: Sequelize.DECIMAL
  },
  paymentMethod: {
    type: Sequelize.ENUM('paypal', 'stripe', 'creditCard'),
    allowNull: false
  },
  shippingInfo: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Order
