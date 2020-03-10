const router = require('express').Router()
const {Product} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = router

router.param('color', async (req, res, next) => {
  try {
    const color = await Product.findAll({
      where: {
        color: req.params.color
      }
    })
    if (color) {
      req.color = color
      next()
    } else {
      const error = new Error('Cannot find product')
      error.status = 404
      next(error)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/instock', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        inventory: {
          [Op.gte]: 1
        }
      }
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/singleColor/:color', async (req, res, next) => {
  try {
    res.json(req.color)
  } catch (error) {
    next(error)
  }
})
