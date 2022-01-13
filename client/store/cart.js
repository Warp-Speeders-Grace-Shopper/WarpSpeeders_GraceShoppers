import axios from "axios";

// action type constant(s):
const GET_CART = "GET_CART";

// action creator(s):
const _getCart = (cart) => {
  return { type: GET_CART, cart };
};

// thunk(s)
export const getCart = (userId) => {
  // take in userId, return cart that belongTo that user
  return async (dispatch) => {
    try {
      const axiosResponse = await axios.get(`/api/users/${userId}/cart`);
      dispatch(_getCart(axiosResponse.data));
    } catch (error) {
      console.log(`error in the getCart thunk: ${error}`);
    }
  };
};

// Reducer
export default function cart(state = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    default:
      return state;
  }
}
