import axios from "axios";

// action type constant(s):
const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const CLEAR_CART = "CLEAR_CART";
const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART";
const EDIT_CART = "EDIT_CART";

const TOKEN = "token";

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
      let cart = window.localStorage.getItem("cart")
        ? JSON.parse(window.localStorage.getItem("cart"))
        : [];
      dispatch(_getCart(cart));
    } else {
      // if Customer
      if (window.localStorage.getItem("cart")) {
        let sessionCart = JSON.parse(window.localStorage.getItem("cart"))
        sessionCart.forEach(product => dispatch(addToCart(product.id, product.Order_Product.quantity, userId)))
        localStorage.setItem("cart", JSON.stringify([]));
      }
      const token = window.localStorage.getItem(TOKEN);

      const axiosResponse = await axios.get(`/api/users/${userId}/cart`, {
        headers: { authorization: token },
      });
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
      const token = window.localStorage.getItem(TOKEN);
      // console.dir(token);
      const axiosResponse = await axios({
        method: "post",
        url: `/api/users/${userId}/addToCart`,
        headers: { authorization: token },
        data: { productId, quantity },
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
      const token = window.localStorage.getItem(TOKEN);
      await axios.delete(`/api/users/${userId}/clearCart`, {
        headers: { authorization: token },
      });
    }
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
      const token = window.localStorage.getItem(TOKEN);
      await axios.delete(`/api/users/${userId}/removeFromCart/${product.id}`, {
        headers: { authorization: token },
      });
    }
    dispatch(_removeItemFromCart(product));
  } catch (error) {
    console.log(`error in the removeItemFromCart thunk: ${error}`);
  }
};

export const editCart = (product, userId) => async (dispatch) => {
  try {
    // if Guest
    if (!userId) {
      let cart = JSON.parse(window.localStorage.getItem("cart"));
      // Check if product exists in cart
      cart.find(
        (lineItem) => lineItem.id === product.id
      ).Order_Product.quantity = product.Order_Product.quantity;
      // Save new cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
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
  try {
    if (!userId) {
      let order = JSON.parse(window.localStorage.getItem("cart"));
      await axios.post("/api/users/guestCheckout", { email, order });
      localStorage.setItem("cart", JSON.stringify([]));
    } else {
      const token = window.localStorage.getItem(TOKEN);
      await axios({
        method: "post",
        url: `/api/users/${userId}/buyCart`,
        headers: { authorization: token },
      });
    }
    dispatch(_clearCart());
  } catch (error) {
    console.log(`error in the buyCart thunk: ${error}`);
  }
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
        const newState = state.map((cartItem) => {
          if (cartItem.id != action.product.id) {
            return cartItem;
          } else {
            return {
              ...cartItem,
              Order_Product: {
                ...cartItem.Order_Product,
                quantity:
                  cartItem.Order_Product.quantity +
                  action.product.Order_Product.quantity,
              },
            };
          }
        });
        return newState;
      } else {
        return [...state, action.product];
      }
    }
    case EDIT_CART:
      return state.map((item) =>
        item.id === action.product.id ? action.product : item
      );
    case CLEAR_CART:
      return [];
    case REMOVE_ITEM_FROM_CART:
      return state.filter((plant) => plant.id !== action.product.id);
    default:
      return state;
  }
}
