const Sequelize = require('sequelize')
const db = require('../db')

const OrderHistory = db.define('order_history', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  currentPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  date: {
    type: Sequelize.DATEONLY,
    defaultValue: new Date()
  }
})

module.exports = OrderHistory
