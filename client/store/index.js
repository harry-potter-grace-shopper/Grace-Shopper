import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import productReducer from './products'
import singleProductReducer from './singleProduct'
import allUsersReducer from './users'
import cartReducer from './cart'
import guestCartReducer from './guestCart'
import inStockProductsReducer from './instock'

const reducer = combineReducers({
  user,
  users: allUsersReducer,
  products: productReducer,
  product: singleProductReducer,
  cart: cartReducer,
  guestCart: guestCartReducer,
  inStockProducts: inStockProductsReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
