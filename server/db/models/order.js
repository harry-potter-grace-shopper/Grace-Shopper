const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  shippingInfo: {
    type: Sequelize.STRING
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order
