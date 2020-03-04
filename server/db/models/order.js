const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const Order = db.define('order', {
  shippingInfo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isComplete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

Order.getTotal = async function(orderId) {
  const productCostArr = await Order.findAll({
    where: {
      id: orderId
    },
    include: Product,
    attributes: ['Price']
  })
  return productCostArr.reduce((a, b) => a + b, 0)
}

module.exports = Order
