const router = require('express').Router()
const {Product} = require('../db/models')

import {adminsOnly} from '../utils'

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
