const router = require('express').Router()
const {User, Product, OrderHistory, Order} = require('../db/models')
module.exports = router

const {currentUserOnly} = require('../utils')

router.get('/:productId/:orderId', async (req, res, next) => {
  try {
    const {productId, orderId} = req.params
    const orderItem = await OrderHistory.findOne({
      where: {
        productId: productId,
        orderId: orderId
      }
    })
    res.json(orderItem.quantity)
  } catch (e) {
    next(e)
  }
})

router.put('/:productId/:orderId/remove', async (req, res, next) => {
  try {
    const {productId, orderId} = req.params
    const orderItem = await OrderHistory.findOne({
      where: {
        productId: productId,
        orderId: orderId
      }
    })
    orderItem.quantity = orderItem.quantity - 1
    res.json(orderItem.quantity)
  } catch (e) {
    next(e)
  }
})

router.put('/:productId/:orderId/add', async (req, res, next) => {
  try {
    const {productId, orderId} = req.params
    const orderItem = await OrderHistory.findOne({
      where: {
        productId: productId,
        orderId: orderId
      }
    })
    orderItem.quantity = orderItem.quantity + 1
    res.json(orderItem)
  } catch (e) {
    next(e)
  }
})
