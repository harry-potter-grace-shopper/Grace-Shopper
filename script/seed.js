'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const products = await Promise.all([
    Product.create({
      name: 'On Magic - Purple',
      price: 51.99,
      description:
        'New generation tamagotchi. Raise your My Tama, feed and care for it, send it on playdates. Color: Purple',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/71b84TxN1BL._AC_SX679_.jpg'
    }),
    Product.create({
      name: 'On Fairy - Blue',
      price: 51.51,
      description:
        'New generation tamagotchi. Raise your My Tama, feed and care for it, send it on playdates. Color: Blue',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/715%2BAhvEF6L._AC_SX679_.jpg'
    }),
    Product.create({
      name: 'On Magic - Green',
      price: 47.99,
      description:
        'New generation tamagotchi. Raise your My Tama, feed and care for it, send it on playdates. Color: Green',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/61vT7Txan5L._AC_SX679_.jpg'
    })
  ])

  console.log(
    `seeded ${users.length} users`,
    `seeded ${products.length} products`
  )
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
