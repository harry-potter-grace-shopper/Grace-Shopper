const router = require('express').Router()
const {User, Product, Cart, Order} = require('../db/models')
module.exports = router

const adminsOnly = (req, res, next) => {
  if (!req.user.admin) {
    const err = new Error("Wait, that's illegal")
    err.status = 401
    return next(err)
  }
  next()
}

const currentUserOnly = (req, res, next) => {
  if (req.user.id !== Number(req.params.userId)) {
    const err = new Error("Wait, that's illegal")
    err.status = 401
    return next(err)
  }
  next()
}

const adminOrCurrentUser = (req, res, next) => {
  if (req.user.id === Number(req.params.userId) || req.user.admin) {
    next()
  } else {
    const err = new Error('Not your Page!')
    err.status = 401
    return next(err)
  }
}

//get all users for admin only
router.get('/', adminsOnly, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//get single page user for admins and the logged in user
router.get('/:userId', adminOrCurrentUser, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json('User is not defined!')
    }
  } catch (err) {
    next(err)
  }
})

// create  and undo user/product association in  cart +

router.get(
  '/:action/:userId/:prodId',
  currentUserOnly,
  async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.userId)
      const product = await Product.findByPk(req.params.prodId)
      if (req.params.action === 'add') {
        user.addProduct(product)
        res.send(product)
      } else {
        user.removeProduct(product)
        res.sendStatus(204)
      }
      //this sends back the newly added product to then add to the state
    } catch (err) {
      next(err)
    }
  }
)

router.get('/checkout/:userId', currentUserOnly, async (req, res, next) => {
  try {
    const cartItems = await Cart.findAll({
      where: {
        userId: req.params.userId
      },
      attributes: ['productId']
    })

    // WE WILL NEED TO UPDATE THIS TO INCLUDE THE ADDITIONAL FORM DATA FOR ORDER PROPERTIES
    //RIGHT NOW IT IS ONLY SENDING PRODUCTIDs
    console.log(cartItems)
    const orderItems = cartItems.map(obj => {
      return obj.productId
    })
    const newOrder = await Order.create({
      productsId: orderItems,
      paymentMethod: 'paypal',
      shippingInfo: 'home'
    })
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})

//
