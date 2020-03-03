const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

Cart.prototype.changeCart = async function(userId, itemId, action) {
  const cartItem = await Cart.findOne({
    where: {userId: userId, productId: itemId}
  })
  if (action === 'add') {
    cartItem.quantity = cartItem.quantity + 1
  } else {
    cartItem.quantity = cartItem.quantity - 1
  }
}

module.exports = Cart
