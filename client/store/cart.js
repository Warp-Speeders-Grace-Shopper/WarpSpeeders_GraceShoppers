import axios from "axios";

// action type constant(s):
const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const CLEAR_CART = "CLEAR_CART";
const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART";
const EDIT_CART = "EDIT_CART";
const BUY_CART = "BUY_CART";

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

const _editCart = (product) => {
  return { type: EDIT_CART, product };
};

// there is no buyCart action creator -- clearCart is used instead.

// thunk(s)
export const getCart = (userId) => async (dispatch) => {
  try {
    // if Guest
    if (!userId) {
      // Check if cart exists in localStorage
      // If cart not exists, create new cart array
      let cart = window.localStorage.getItem("cart")
        ? JSON.parse(window.localStorage.getItem("cart"))
        : [];
      dispatch(_getCart(cart));
    } else {
      // if Customer
      // take in userId, return cart that belongTo that user
      const axiosResponse = await axios.get(`/api/users/${userId}/cart`);
      dispatch(_getCart(axiosResponse.data));
    }
  } catch (error) {
    console.log(`error in the getCart thunk: ${error}`);
  }
};

export const addToCart = (productId, quantity, userId) => async (dispatch) => {
  try {
    // if Guest
    if (!userId) {
      const axiosResponse = await axios.get(`/api/products/${productId}`);
      let newItem = {
        ...axiosResponse.data,
        Order_Product: {
          quantity,
        },
      };
      dispatch(_addToCart(newItem));
      // Check if cart exists in localStorage
      // If cart not exists, create new cart array
      let cart = window.localStorage.getItem("cart")
        ? JSON.parse(window.localStorage.getItem("cart"))
        : [];
      // Check if product exists in cart
      if (cart.find((lineItem) => lineItem.id === productId)) {
        // If exists, increment qty
        cart.find(
          (lineItem) => lineItem.id === productId
        ).Order_Product.quantity += quantity;
      } else {
        // If not exists, create new obj for order line {productId: _, qty: _} and push to array
        cart.push(newItem);
      }
      // Save new cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      // if Customer
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
    if (!userId) {
      localStorage.setItem("cart", JSON.stringify([]));
    } else {
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
    if (!userId) {
      let cart = JSON.parse(window.localStorage.getItem("cart"));
      cart = cart.filter((lineItem) => lineItem.id !== product.id);
      // Save new cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
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

export const editCart = (product, userId) => async (dispatch) => {
  try {
    // if Guest
    if (!userId) {
      // Check if cart exists in localStorage
      // If cart not exists, create new cart array
      let cart = JSON.parse(window.localStorage.getItem("cart"));
      // Check if product exists in cart
      // If exists, increment qty
     cart.find(
        (lineItem) => lineItem.id === product.id
      ).Order_Product.quantity = product.Order_Product.quantity;
      // Save new cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
      // dispatch(_addToCart(newItem));
    } else {
      // if Customer
      const axiosResponse = await axios.put(
        `/api/users/${userId}/editCart`,
        product
      );
    }
    dispatch(_editCart(product));
  } catch (error) {
    console.log(`error in the addToCart thunk: ${error}`);
  }
};

export const buyCart = (userId, email) => async (dispatch) => {
  if (!userId) {
    try {
      let order = JSON.parse(window.localStorage.getItem("cart"));
      await axios.post('/api/users/guestCheckout', {email, order});
      localStorage.setItem("cart", JSON.stringify([]));
    } catch(error) {
      console.log(`error in the buyCart thunk: ${error}`);
    }
  }
  else {
    // if logged-in user, set their cart to "closed" in db.
    try {
      await axios.post(`/api/users/${userId}/buyCart`);
    } catch (error) {
      console.log(`error in the buyCart thunk: ${error}`);
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
    case EDIT_CART: 
      return state.map(item => item.id === action.product.id ? action.product : item)
    case CLEAR_CART:
      return [];
    case REMOVE_ITEM_FROM_CART:
      return state.filter((plant) => plant.id !== action.product.id);
    default:
      return state;
  }
}
