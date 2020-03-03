'use strict'

const db = require('../server/db')
const {User, Product, Order, Cart} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const user1 = await User.create({email: 'cody@email.com', password: '123'})
  const user2 = await User.create({email: 'murphy@email.com', password: '123'})

  const prod1 = await Product.create({
    name: 'On Magic - Purple',
    price: 51.99,
    description:
      'New generation tamagotchi. Raise your My Tama, feed and care for it, send it on playdates. Color: Purple',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71b84TxN1BL._AC_SX679_.jpg'
  })
  const prod2 = await Product.create({
    name: 'On Fairy - Blue',
    price: 51.51,
    description:
      'New generation tamagotchi. Raise your My Tama, feed and care for it, send it on playdates. Color: Blue',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/715%2BAhvEF6L._AC_SX679_.jpg'
  })
  const prod3 = await Product.create({
    name: 'On Magic - Green',
    price: 47.99,
    description:
      'New generation tamagotchi. Raise your My Tama, feed and care for it, send it on playdates. Color: Green',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61vT7Txan5L._AC_SX679_.jpg'
  })

  const order1 = await Order.create({
    productsId: [1, 2, 3],
    totalCost: 151.49,
    paymentMethod: 'creditCard',
    shippingInfo: '23 Maple Drive, Brooklyn, NY, 11135'
  })
  const order2 = await Order.create({
    productsId: [1, 1, 1],
    totalCost: 155.97,
    paymentMethod: 'stripe',
    shippingInfo: '12 Oak Lane, Vancouver, WA, 92913'
  })
  const order3 = await Order.create({
    productsId: [3],
    totalCost: 47.99,
    paymentMethod: 'paypal',
    shippingInfo: 'The Knaves, Duke Street, Stanton, MA, 39135'
  })

  //Establishing a user's order history
  //2 of the orders belong to one of the users
  // 1 of the orders belongs to the other user
  await user1.addOrders([order1, order2]) // userIDs are on the order Instances.
  await user2.addOrder(order3)

  //Establishing cart through table
  //2 products belong to a user
  // one product belongs to a user several times
  await user2.addProducts([prod1, prod2])

  //await user1.addProducts([prod3, prod3, prod3]); // cannot add multiple instances on a many to many table. Therefore cannot add 2+ products of the same item for one user

  //Associating products onto an order
  // Put one product onto an order
  //await order2.addProducts([prod2, prod1]);
  // await order1.addProducts([prod2, prod1]); //puts orderID onto product object. Only adds 1 order per product.  Should this be the other way around?

  // console.log(
  //   `seeded ${users.length} users`,
  //   `seeded ${products.length} products`
  //   `seeded orders`
  // )

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
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

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
