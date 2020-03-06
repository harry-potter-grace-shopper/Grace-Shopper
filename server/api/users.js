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

////adding product to the cart
router.put('/:userId/cart', currentUserOnly, async (req, res, next) => {
  try {
    const currentProduct = await Product.findByPk(req.body.id)
    const currentOrder = await Order.findOne({
      where: {userId: req.params.userId, completed: false}
    })
    const orderItem = await OrderHistory.findOne({
      where: {
        productId: currentProduct.id,
        orderId: currentOrder.id
      }
    })
    if (orderItem) {
      res.sendStatus('already in your cart')
    } else {
      await currentOrder.addProduct(currentProduct)
      const cartItem = await OrderHistory.findOne({
        where: {
          productId: currentProduct.id,
          orderId: currentOrder.id
        }
      })
      await cartItem.update({currentPrice: currentProduct.price})
      res.json(currentProduct)
    }
  } catch (error) {
    next(error)
  }
})

////removing product from the cart
router.delete('/:userId/cart', currentUserOnly, async (req, res, next) => {
  try {
    console.log(req.body.id)
    const removedProduct = await Product.findByPk(req.body.id)
    const currentOrder = await Order.findOne({
      where: {userId: req.params.userId, completed: false}
    })
    await currentOrder.removeProduct(removedProduct)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

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

/*
navigating the cartItems array :
product id = cartItem.id,
name = cartItem.name,
imageUrl = cartItem.imageUrl,
quantity = cartItem.orders[0].order_history.quantity,
currentPrice = cartItem.orders[0].order_history.currentPrice
*/
