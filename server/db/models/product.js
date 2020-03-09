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
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://www.logolynx.com/images/logolynx/d4/d429675b3b80e9cae4ab2f1dc734926a.gif'
    // validate: {
    //   isUrl: true
    // }
  },
  inventory: {
    type: Sequelize.INTEGER
  }
})

module.exports = Product
