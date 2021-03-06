const router = require('express').Router()
const {User, Product, OrderHistory, Order} = require('../db/models')
module.exports = router

const {adminsOnly, currentUserOnly, adminOrCurrentUser} = require('../utils')

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
    const user = await User.findByPk(req.params.userId, {
      attributes: ['id', 'email']
    })
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json('User is not defined!')
    }
  } catch (err) {
    next(err)
  }
})

//incrementing and decrementing the cart
router.put('/:userId/cart/:action', currentUserOnly, async (req, res, next) => {
  try {
    const {productId, orderId} = req.body
    const orderItem = await OrderHistory.findOne({
      where: {
        productId: productId,
        orderId: orderId
      }
    })
    if (req.params.action === 'add') {
      await orderItem.increment('quantity')
    }
    if (req.params.action === 'remove') {
      await orderItem.decrement('quantity')
    }
    res.json(orderItem)
  } catch (e) {
    next(e)
  }
})

////adding product to the cart
router.put('/:userId/cart', currentUserOnly, async (req, res, next) => {
  try {
    const currentProduct = await Product.findByPk(req.body.id)
    const currentOrder = await Order.findOne({
      where: {userId: req.params.userId, completed: false}
    })
    await currentOrder.addProduct(currentProduct, {
      currentPrice: currentProduct.price
    })
    const newProduct = await Product.findByPk(req.body.id, {
      include: {
        model: Order
      }
    })
    const orderItem = await OrderHistory.findOne({
      where: {
        productId: req.body.id,
        orderId: currentOrder.id
      }
    })
    if (req.body.quantity) {
      const newQty = req.body.quantity + orderItem.quantity - 1
      await orderItem.update({quantity: newQty})
    }
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})

////removing product from the cart
router.delete(
  '/:userId/cart/:prodId',
  currentUserOnly,
  async (req, res, next) => {
    try {
      const removedProduct = await Product.findByPk(req.params.prodId)
      const currentOrder = await Order.findOne({
        where: {userId: req.params.userId, completed: false}
      })
      await currentOrder.removeProduct(removedProduct)
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
)

router.put('/checkout/:userId/', currentUserOnly, async (req, res, next) => {
  try {
    const currentOrder = await Order.findOne({
      where: {userId: req.params.userId, completed: false}
    })
    await currentOrder.update({
      completed: true,
      shippingInfo: req.body.address
    })
    res.json(currentOrder)

    const newEmptyOrder = await Order.create({shippingInfo: 'none'})

    await newEmptyOrder.setUser(req.params.userId)
  } catch (error) {
    next(error)
  }
})

//Route to get the user's cart
router.get('/:userId/cart', currentUserOnly, async (req, res, next) => {
  try {
    const cartItems = await Product.findAll({
      include: {
        model: Order,
        where: {
          userId: req.params.userId,
          completed: false
        }
      }
    })
    if (cartItems.length === 0) {
      const error = new Error('Your cart is empty')
      next(error)
    } else {
      res.json(cartItems) //This returns an array of productObjects
    }
  } catch (error) {
    next(error)
  }
})

router.get(
  '/:userId/ordersHistory',
  currentUserOnly,
  async (req, res, next) => {
    try {
      const oldOrders = await Order.findAll({
        where: {userId: req.params.userId, completed: true},
        include: {model: Product}
      })
      res.json(oldOrders)
    } catch (error) {
      next(error)
    }
  }
)

//update user account

router.put('/:userId/', currentUserOnly, async (req, res, next) => {
  try {
    const updatedUser = await User.findByPk(req.params.userId)
    await updatedUser.update(req.body)
    if (updatedUser) {
      res.status(200).json(updatedUser)
    } else {
      const error = new Error('Failed to update user')
      error.status = 500
      throw error
    }
  } catch (err) {
    next(err)
  }
})

/*
navigating the cartItems array :
product id = cartItem.id,
name = cartItem.name,
imageUrl = cartItem.imageUrl,
quantity = cartItem.orders[0].order_history.quantity,
currentPrice = cartItem.orders[0].order_history.currentPrice
*/
