/* eslint-disable max-statements */
'use strict'

const db = require('../server/db')
const {User, Product, Order, OrderHistory} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const user1 = await User.create({
    firstName: 'Cody',
    lastName: 'Pug',
    email: 'cody@email.com',
    password: '123'
  })
  const user2 = await User.create({email: 'murphy@email.com', password: '123'})
  const user3 = await User.create({
    email: 'admin@email.com',
    password: '123',
    admin: true
  })

  const prod1 = await Product.create({
    name: 'Purple Magic',
    price: 51,
    description:
      'New generation tamagotchi. Raise your My Tama, feed and care for it, send it on playdates. Color: Purple',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71b84TxN1BL._AC_SX679_.jpg',
    inventory: 0,
    color: 'Purple'
  })
  const prod2 = await Product.create({
    name: 'White Magic',
    price: 51,
    description:
      'New generation tamagotchi. Raise your My Tama, feed and care for it, send it on playdates. Color: White',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/716Nk-BMlTL._AC_SX569_.jpg',
    inventory: 5,
    color: 'White'
  })
  const prod3 = await Product.create({
    name: 'Green Magic',
    price: 47,
    description:
      'New generation tamagotchi. Raise your My Tama, feed and care for it, send it on playdates. Color: Green',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61vT7Txan5L._AC_SX679_.jpg',
    inventory: 100,
    color: 'Green'
  })

  await Product.create({
    name: 'Ban Dai',
    price: 21,
    description:
      'Ban Dai - Tamagotchi Gudetamatama Sitting ver.Tamagotchi & Cover Set. The instruction manual for this product is in Japanese. Instructions in English are not included',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61PyNKmgveL._AC_SL1500_.jpg',
    inventory: 1000,
    color: 'Orange'
  })

  await Product.create({
    name: 'Purple Japan Tama',
    price: 57,
    description:
      'Tamagotchi from meets (Meets Tamagotchi), pastel Meets ver. Purple appeared! Or born twins in addition to the m! X play in the Tamagotchi Meets, Tama pet ranks. I just Tamagotchi different ultra-unique every time (Now Tama) grow up. Variations ∞ (infinity) !? Allowed to go out to further grow the now-Tama "Tamagotchi meets app", you brag about the country of the user. Use battery: single 4x2 (sold separately)',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/7181ooeU4lL._AC_SL1000_.jpg',
    inventory: 25,
    color: 'Purple'
  })

  await Product.create({
    name: 'Meets Fantasy Purple',
    price: 80,
    description: 'This item is Brand new & factory sealed.',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/91pVoAiJ%2BVL._AC_SL1500_.jpg',
    inventory: 60,
    color: 'Purple'
  })

  await Product.create({
    name: 'Chansey Check!',
    price: 51,
    description:
      ' A mobile character LCD toy of the new character "Watch Lynn", a big success in the program. Specially designed specification that can check todays lucky degree with Watch Lynns Lucky Check, which is also directed at animation, and can play conversation. I always attach with a belt and stay with me. Use battery: CR2032 ~ 1 (included)',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61Z%2Bx8Kus4L._AC_SL1000_.jpg',
    inventory: 150,
    color: 'Pink'
  })

  await Product.create({
    name: '4U Purple',
    price: 69,
    description:
      'Product introduction Reincarnation completely new Tamagotchi, which was equipped with a "Tatchitsu Shin feature" a new sense as a "Life Tools", appeared!',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71FKOH7KBkL._AC_SL1370_.jpg',
    inventory: 1234,
    color: 'Purple'
  })

  await Product.create({
    name: '4U White',
    price: 69,
    description:
      'A new generation of TAMAGOTCHI, gTAMAGOTCHI 4Uh. You can connect with others! TAMAGOTCHI 4U allows you to connect with other by using the touch function of the device. ',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71qgskHqfhL._AC_SL1389_.jpg',
    inventory: 9000,
    color: 'White'
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

  const orderHistory1 = await OrderHistory.findOne({
    where: {
      productId: prod1.id,
      orderId: order1.id
    }
  })
  await orderHistory1.update({currentPrice: prod1.price})

  const orderHistory2 = await OrderHistory.findOne({
    where: {
      productId: prod2.id,
      orderId: order1.id
    }
  })
  await orderHistory2.update({currentPrice: prod2.price})

  const orderHistory4 = await OrderHistory.findOne({
    where: {
      productId: prod1.id,
      orderId: order2.id
    }
  })
  await orderHistory4.update({currentPrice: prod1.price})

  const orderHistory3 = await OrderHistory.findOne({
    where: {
      productId: prod3.id,
      orderId: order3.id
    }
  })
  await orderHistory3.update({currentPrice: prod3.price})

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
