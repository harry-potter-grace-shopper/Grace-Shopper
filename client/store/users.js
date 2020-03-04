import axios from 'axios'

//ACTION TYPES
const GET_USERS = 'GET_USERS'

//INITIAL STATE
const allUsers = []

//ACTION CREATORS
const getUsers = users => ({
  type: GET_USERS,
  users
})

//THUNK CREATORS

export const fetchUsers = () => async dispatch => {
  try {
    const users = await axios.get('/api/users')
    dispatch(getUsers(users.data))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER
export default function(state = allUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default:
      return state
  }
}
