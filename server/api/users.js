const router = require('express').Router()
const {User, Product, Order} = require('../db/models')
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
    await currentOrder.addProduct(currentProduct)
    res.json(currentProduct)
  } catch (error) {
    next(error)
  }
})

////removing product from the cart
router.delete('/:userId/cart', currentUserOnly, async (req, res, next) => {
  try {
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

router.put('/checkout/:userId', currentUserOnly, async (req, res, next) => {
  try {
    const currentOrder = await Order.findOne({
      where: {userId: req.params.userId, completed: false}
    })
    await currentOrder.update({completed: true})
    await Order.create({userId: req.params.id})
    res.json(currentOrder)
  } catch (error) {
    next(error)
  }
})
