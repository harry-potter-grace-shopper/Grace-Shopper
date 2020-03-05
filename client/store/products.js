import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

export const getProductsThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getProducts(data))
    } catch (error) {
      console.log('Failed to GET /api/products', error)
    }
  }
}

const createProduct = newProduct => ({
  type: CREATE_PRODUCT,
  newProduct
})

export const createProductThunk = product => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/products', product)
      dispatch(createProduct(data))
    } catch (error) {
      console.log('Error with creating of the new product!', error)
    }
  }
}

const removeProduct = productId => ({
  type: REMOVE_PRODUCT,
  productId
})

export const removeProductThunk = productId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${productId}`)
      dispatch(removeProduct(productId))
    } catch (error) {
      console.log('Error with deleting of product from the database', error)
    }
  }
}

const initialState = []

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case CREATE_PRODUCT:
      return [...state, action.newProduct]
    case REMOVE_PRODUCT:
      const newState = state.filter(product => {
        if (product.id !== action.productId) {
          return {...product}
        }
      })
      return newState
    default:
      return state
  }
}

export default productReducer
