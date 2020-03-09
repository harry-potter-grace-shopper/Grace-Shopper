import axios from 'axios'

const GET_MY_ORDERS = 'GET_MY_ORDERS'

const getOrdersHistory = orders => ({
  type: GET_MY_ORDERS,
  orders
})

export const getOrdersHistoryThunk = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}/ordersHistory`)
      dispatch(getOrdersHistory(data))
    } catch (error) {
      console.log('Error with fetching of all old orders', error)
    }
  }
}

const initialState = []
const ordersHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_ORDERS:
      return action.orders
    default:
      return state
  }
}

export default ordersHistoryReducer
