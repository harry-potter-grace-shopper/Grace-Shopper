const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  // many to many relationship with products, you don't need the duplicate products array here to store all of the ids -> you can use a magic method order.getProducts() to retrieve all of those products anyway.
  productsId: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  totalCost: {
    type: Sequelize.DECIMAL // int
  }, // would also consider looking into a virtual if you want to access this as a property OR use a prototype method in order to build this.
  paymentMethod: {
    // i also think -> you may not need this information in here because stripe/paypal will deal with it for you
    type: Sequelize.ENUM('paypal', 'stripe', 'creditCard'),
    allowNull: false
  },
  shippingInfo: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Order
