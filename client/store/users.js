import axios from 'axios';

//ACTION TYPES
const GET_USERS = 'GET_USERS'

//ACTION CREATORS
const _getUsers = (users) => ({
  type: GET_USERS,
  users
})

//THUNKS
export const getUsers = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get("/api/users")
      dispatch(_getUsers(data))
    } catch (err) {
      console.log(err)
    }
  }
}

//REDUCER
const initialState =[];

export default function users(state = initialState,
action) {
  switch(action.type) {
    case GET_USERS:
      return action.users
    default:
      return state
  }
}
