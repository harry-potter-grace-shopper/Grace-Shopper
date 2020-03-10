import axios from 'axios'

const GET_PRODUCTS_BY_COLOR = 'GET_PRODUCTS_BY_COLOR'

const getProductsByColor = sameColorProducts => ({
  type: GET_PRODUCTS_BY_COLOR,
  sameColorProducts
})

export const getProductsByColorThunk = color => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/categories/singleColor/${color}`)
      dispatch(getProductsByColor(data))
    } catch (e) {
      console.log('Failed to GET /api/categories/singleColor/:color', e)
    }
  }
}

const initialState = []

const productsByColorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BY_COLOR:
      return action.sameColorProducts
    default:
      return state
  }
}

export default productsByColorReducer
