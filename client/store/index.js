import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import productReducer from './products'
import singleProductReducer from './singleProduct'
import allUsersReducer from './users'
import cartReducer from './cart'

const reducer = combineReducers({
  user,
  users: allUsersReducer,
  products: productReducer,
  product: singleProductReducer,
  cart: cartReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
