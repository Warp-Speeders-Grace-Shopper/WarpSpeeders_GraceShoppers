import axios from "axios";

// action type constant(s):
const GET_ORDERS = "GET_ORDERS";

// action creator(s):
const _getOrders = (orders) => {
  return { type: GET_ORDERS, orders };
};

// thunk(s)
export const getOrders = (userId) => {
  // take in userId, return array of orders that belongTo that user
  return async (dispatch) => {
    try {
      const axiosResponse = await axios.get(`/api/users/${userId}/orders`);
      dispatch(_getOrders(axiosResponse.data));
    } catch (error) {
      console.log(`error in the getOrders thunk: ${error}`);
    }
  };
};

// Reducer
export default function currentOrders(state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    default:
      return state;
  }
}
