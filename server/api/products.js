const router = require('express').Router()
const {Product} = require('../db/models')

const {adminsOnly} = require('../utils')

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
  // req.product
  // res.json(req.product)
  try {
    const product = await Product.findByPk(req.params.id)
    if (product) {
      res.json(product)
    } else {
      // you can send this back or you can pass this on to your error handling middleware if you wanted to
      // const error = new Error('product is not defined');
      // error.status = 404;
      // next(error);
      res.status(404).json('Product is not defined!')
    }
  } catch (error) {
    next(error)
  }
})

// router.param
/*
router.param(async (id, req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (product) {
      req.product = product;
      next();
    } catch (e) {
      next(e);
    }
})
*/

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
    res.sendStatus(204) //removed .json(product)
  } catch (error) {
    next(error)
  }
})
