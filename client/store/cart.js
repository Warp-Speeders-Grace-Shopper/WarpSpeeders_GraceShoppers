import axios from "axios";

// action type constant(s):
const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_CART";

// action creator(s):
const _getCart = (cart) => {
  return { type: GET_CART, cart };
};

const _addToCart = (product) => {
  return { type: ADD_TO_CART, product };
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

export const addToCart = (productId, userId) => async (dispatch) => {
  try {
    const axiosResponse = await axios.post(`/api/users/${userId}/addToCart`, {
      productId,
    });
    dispatch(_addToCart(axiosResponse.data));
  } catch (error) {
    console.log(`error in the addToCart thunk: ${error}`);
  }
};

export const addToGuestCart = (productId) => async (dispatch) => {
  try {
    const axiosResponse = await axios.get(`/api/products/${productId}`);
    dispatch(_addToCart(axiosResponse.data));
  } catch (error) {
    console.log(`error in the addToGuestCart! ${error}`);
  }
};

// Reducer
export default function cart(state = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_TO_CART:
      return [...state, action.product];
    default:
      return state;
  }
}
