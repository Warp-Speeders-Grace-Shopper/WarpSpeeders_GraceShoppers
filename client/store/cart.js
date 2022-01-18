import axios from 'axios';

// action type constant(s):
const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const CLEAR_CART = 'CLEAR_CART';
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';
const BUY_CART = 'BUY_CART';

const TOKEN = 'token';

// action creator(s):
const _getCart = (cart) => {
  return { type: GET_CART, cart };
};

export const _clearCart = () => {
  return { type: CLEAR_CART };
};

const _addToCart = (product) => {
  return { type: ADD_TO_CART, product };
};

const _removeItemFromCart = (product) => {
  return { type: REMOVE_ITEM_FROM_CART, product };
};

// there is no buyCart action creator -- clearCart is used instead.

// thunk(s)
export const getCart = (userId) => {
  // take in userId, return cart that belongTo that user
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const axiosResponse = await axios.get(`/api/users/${userId}/cart`, {
        headers: { authorization: token },
      });
      dispatch(_getCart(axiosResponse.data));
    } catch (error) {
      console.log(`error in the getCart thunk: ${error}`);
    }
  };
};

export const addToCart = (productId, quantity, userId) => async (dispatch) => {
  try {
    if (userId === 0) {
      // guest addToCart flow:
      const axiosResponse = await axios.get(`/api/products/${productId}`);
      dispatch(
        _addToCart({
          ...axiosResponse.data,
          Order_Product: {
            quantity,
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

export const clearCart = (userId) => async (dispatch) => {
  try {
    if (userId != 0) {
      // destroy cart in db for logged-in users:
      // console.log(`logged-in user detected. attempting to delete cart from db`);
      await axios.delete(`/api/users/${userId}/clearCart`);
    }
    // reset cart in redux store for all users:
    dispatch(_clearCart());
  } catch (error) {
    console.log(`error in the clearCart thunk: ${error}`);
  }
};

export const removeItemFromCart = (product, userId) => async (dispatch) => {
  try {
    if (userId != 0) {
      // destroy cart in db for logged-in users:
      console.log(`logged-in user detected. attempting to delete cart from db`);
      await axios.delete(`/api/users/${userId}/removeFromCart/${product.id}`);
    }
    // console.log(`remove item thunk reached`);
    // console.dir(product);
    dispatch(_removeItemFromCart(product));
  } catch (error) {
    console.log(`error in the removeItemFromCart thunk: ${error}`);
  }
};

export const buyCart = (userId) => async (dispatch) => {
  if (userId != 0) {
    // if logged-in user, set their cart to "closed" in db.
    try {
      await axios.post(`/api/users/${userId}/buyCart`);
    } catch (error) {
      console.log(`error in the getCart thunk: ${error}`);
    }
  }
  // whether logged-in or not, clear redux cart.
  dispatch(_clearCart());
};

// Reducer
export default function cart(state = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_TO_CART: {
      const alreadyInCart = state.findIndex(
        (cartItem) => cartItem.id === action.product.id
      );

      if (alreadyInCart != -1) {
        //adding an item already in the cart:
        // console.log(`adding duplicate item`);
        const newState = state.map((cartItem) => {
          // map over each item in state
          if (cartItem.id != action.product.id) {
            return cartItem;
            // ignore the ones that don't match the action
          } else {
            return {
              ...cartItem,
              Order_Product: {
                ...cartItem.Order_Product,
                quantity:
                  cartItem.Order_Product.quantity +
                  action.product.Order_Product.quantity,
              }, // for the one that does match the action, return it as-is but add action quantity
            };
          }
        });
        return newState;
      } else {
        //adding an item not already in the cart.
        // console.log(`adding new item`);
        return [...state, action.product];
      }
    }

    case CLEAR_CART:
      return [];
    case REMOVE_ITEM_FROM_CART:
      return state.filter((plant) => plant.id !== action.product.id);
    default:
      return state;
  }
}
