import axios from 'axios';

//ACTION TYPES
const GET_USERS = 'GET_USERS'
const TOKEN = "token"

//ACTION CREATORS
const _getUsers = (users) => ({
  type: GET_USERS,
  users
})

//THUNKS
export const getUsers = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN)
      if(token) {
        const {data} = await axios({
          method: "get",
          url: "/api/users",
          headers: {authorization: token}})
        dispatch(_getUsers(data))
      }
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
