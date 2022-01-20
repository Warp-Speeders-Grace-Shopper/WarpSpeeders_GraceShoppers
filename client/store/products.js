import axios from 'axios';

//Action Types

const GET_PRODUCTS = 'GET_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';

const TOKEN = 'token';

//Action Creators

const _getProducts = (products) => ({
  type: GET_PRODUCTS,
  products,
});

const _addProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
});

const _deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  productId,
});

const _editProduct = (product) => ({
  type: EDIT_PRODUCT,
  product,
});

//Thunks

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/products');
      dispatch(_getProducts(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addProduct = (product) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      const { data } = await axios({
        method: 'post',
        url: '/api/products',
        headers: { authorization: token },
        data: product,
      });

      dispatch(_addProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      await axios.delete(`/api/products/${productId}`, {
        headers: { authorization: token },
      });
      dispatch(_deleteProduct(productId));
    } catch (err) {
      console.log(err);
    }
  };
};

export const editProduct = (product) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      const { data } = await axios({
        method: 'put',
        url: `/api/products/${product.id}`,
        headers: { authorization: token },
        data: product,
      });
      dispatch(_editProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//Reducer

const initialState = [];

export default function products(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products.sort((p1, p2) => p1.id - p2.id);
    case ADD_PRODUCT:
      return [...state, action.product];
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.productId);
    case EDIT_PRODUCT:
      return state.map((product) => {
        return product.id === action.product.id ? action.product : product;
      });
    default:
      return state;
  }
}
