const router = require('express').Router()
const {Product} = require('../db/models')

const {adminsOnly} = require('../utils')

module.exports = router

router.param('id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (product) {
      req.product = product
      next()
    }
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', (req, res, next) => {
  try {
    if (req.product) {
      res.json(req.product)
    } else {
      const error = new Error('This product is not defined')
      error.status = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', adminsOnly, async (req, res, next) => {
  try {
    // do try to avoid using just req.body -> take out the necessary fields, that would be great.
    const newProduct = await Product.create(req.body)
    res.status(201).json(newProduct)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', adminsOnly, async (req, res, next) => {
  try {
    // be very careful because this will change every single product to your req.body -> returns an array of 2 values, number of rows changed, and the array of instances
    const updatedProduct = await Product.update(req.body)
    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', adminsOnly, async (req, res, next) => {
  try {
    await Product.delete({where: {id: req.param.id}})
    res.status(204).json('Deleted product!') // does not send back a body so you will enver see deleted product
  } catch (error) {
    next(error)
  }
})
