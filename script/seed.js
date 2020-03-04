'use strict'

const db = require('../server/db')
const {User, Product, Order, OrderHistory} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const user1 = await User.create({email: 'cody@email.com', password: '123'})
  const user2 = await User.create({email: 'murphy@email.com', password: '123'})
  const user3 = await User.create({
    email: 'admin@email.com',
    password: '123',
    admin: true
  })

  const prod1 = await Product.create({
    name: 'On Magic - Purple',
    price: 51,
    description:
      'New generation tamagotchi. Raise your My Tama, feed and care for it, send it on playdates. Color: Purple',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71b84TxN1BL._AC_SX679_.jpg'
  })
  const prod2 = await Product.create({
    name: 'On Fairy - Blue',
    price: 51,
    description:
      'New generation tamagotchi. Raise your My Tama, feed and care for it, send it on playdates. Color: Blue'
  })
  const prod3 = await Product.create({
    name: 'On Magic - Green',
    price: 47,
    description:
      'New generation tamagotchi. Raise your My Tama, feed and care for it, send it on playdates. Color: Green',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61vT7Txan5L._AC_SX679_.jpg'
  })

  const order1 = await Order.create({
    shippingInfo: '23 Maple Drive, Brooklyn, NY, 11135',
    completed: true
  })
  const order2 = await Order.create({
    shippingInfo: '12 Oak Lane, Vancouver, WA, 92913',
    completed: false
  })
  const order3 = await Order.create({
    shippingInfo: 'The Knaves, Duke Street, Stanton, MA, 39135',
    completed: false
  })

  await order1.addProducts([prod1, prod2])
  await order2.addProduct(prod1)
  await order3.addProducts(prod3)

  await user1.addOrders([order1, order2])
  await user2.addOrder(order3)

  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed
