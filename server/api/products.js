const router = require('express').Router()
const {Product} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

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

router.get('/inStock', async (req, res, next) => {
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

router.get('/:color', async (req, res, next) => {
  try {
    const sameColorItems = await Product.findAll({
      where: {color: req.params.color}
    })
    if (sameColorItems) {
      res.json(sameColorItems)
    } else {
      const error = new Error('This color product does not exist defined')
      error.status = 404
      next(error)
    }
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
    if (newProductDetails.imageUrl === '') {
      delete newProductDetails.imageUrl
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
    let updatesForProduct = {}
    if (req.body.name !== '') updatesForProduct.name = req.body.name
    if (req.body.price !== '') updatesForProduct.price = req.body.price
    if (req.body.description !== '')
      updatesForProduct.description = req.body.description
    if (req.body.imageUrl !== '') updatesForProduct.imageUrl = req.body.imageUrl
    await Product.update(updatesForProduct, {where: {id: req.params.id}})
    const product = await Product.findByPk(req.params.id)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', adminsOnly, async (req, res, next) => {
  try {
    await Product.destroy({where: {id: req.params.id}})
    res.sendStatus(204) // does not send back a body so you will enver see deleted product
  } catch (error) {
    next(error)
  }
})
