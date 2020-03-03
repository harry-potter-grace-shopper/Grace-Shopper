const router = require('express').Router()
const {Product} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json('Product is not defined!')
    }
  } catch (error) {
    next(error)
  }
})

const adminsOnly = (req, res, next) => {
  if (!req.user.admin) {
    const err = new Error("Wait, that's illegal")
    err.status = 401
    return next(err)
  }
  next()
}

router.post('/', adminsOnly, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.status(201).json(newProduct)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', adminsOnly, async (req, res, next) => {
  try {
    const updatedProduct = await Product.update(req.body)
    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', adminsOnly, async (req, res, next) => {
  try {
    await Product.delete({where: {id: req.param.id}})
    res.status(204).json('Deleted product!')
  } catch (error) {
    next(error)
  }
})
