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
    const newProductDetails = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imageUrl: req.body.imageUrl
    }
    const newProduct = await Product.create(newProductDetails)
    if (newProduct) {
      res.status(201).json(newProduct)
    } else {
      const error = new Error('Could not create new product')
      error.status(404)
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', adminsOnly, async (req, res, next) => {
  try {
    const updatedProduct = await Product.update(req.body, {
      // Product.update returns num of rows changed and array of updated instances, handled this with returning:true and plain: true below
      where: {
        id: req.params.id //added which product to update
      },
      returning: true, // tells Sequelize to return only the array of updated instances
      plain: true // tells Sequelize to return only the plain objects, not any metadata
    })
    if (updatedProduct) {
      res.json(updatedProduct)
    } else {
      const error = new Error('Could not update product')
      error.status = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', adminsOnly, async (req, res, next) => {
  try {
    await Product.delete({where: {id: req.param.id}})
    res.status(204) // does not send back a body so you will enver see deleted product
  } catch (error) {
    next(error)
  }
})
