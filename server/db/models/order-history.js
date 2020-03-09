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

OrderHistory.changeOrder = async function(userId, itemId, action) {
  const orderItem = await OrderHistory.findOne({
    where: {userId: userId, productId: itemId}
  })
  if (action === 'add') {
    orderItem.quantity = orderItem.quantity + 1
  } else {
    orderItem.quantity = orderItem.quantity - 1
  }
}

module.exports = OrderHistory
