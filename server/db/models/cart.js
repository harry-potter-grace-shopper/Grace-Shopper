const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
  // need a price field here to record the CURRENT price when it was PURCHASED/when you added it
})

// I would suggest making this a CLASS method and not an INSTANCE method
// you would need the cartId, perform a findone on cart, and then call changeCart
// Cart.changeChart
// Cart.prototype.changeCart = this = cartItem
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
