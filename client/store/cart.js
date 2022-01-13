import axios from 'axios';

// action type constant(s):
const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const CLEAR_CART = 'CLEAR_CART';
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';

// action creator(s):
const _getCart = (cart) => {
  return { type: GET_CART, cart };
};

const _clearCart = () => {
  return { type: CLEAR_CART };
};

const _addToCart = (product) => {
  return { type: ADD_TO_CART, product };
};

const _removeItemFromCart = (product) => {
  return { type: REMOVE_ITEM_FROM_CART, product };
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
    if (userId === 0) {
      // guest addToCart flow:
      const axiosResponse = await axios.get(`/api/products/${productId}`);
      dispatch(
        _addToCart({
          ...axiosResponse.data,
          Order_Product: {
            quantity: 1,
            checkoutPrice: axiosResponse.data.price,
          }, // this mimics the Order_Product stuff that would be added on when added to the actual db
          // this allows _addToCart action to handle logged-in AND logged-out users.
        })
      );
    } else {
      //logged-in user addToCart flow:
      const axiosResponse = await axios.post(`/api/users/${userId}/addToCart`, {
        productId, // this object can handle quantity already, we can also add other options!
      });
      dispatch(_addToCart(axiosResponse.data));
    }
  } catch (error) {
    console.log(`error in the addToCart thunk: ${error}`);
  }
};

export const clearCart = () => async (dispatch) => {
  // console.log(`clearCart thunk reached`);
  dispatch(_clearCart());
};

export const removeItemFromCart = (product) => async (dispatch) => {
  // console.log(`remove item thunk reached`);
  // console.dir(product);
  dispatch(_removeItemFromCart(product));
};

// Reducer
export default function cart(state = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_TO_CART:
      return [...state, action.product];
    case CLEAR_CART:
      return [];
    case REMOVE_ITEM_FROM_CART:
      return state.filter((plant) => plant.id !== action.product.id);
    default:
      return state;
  }
}
