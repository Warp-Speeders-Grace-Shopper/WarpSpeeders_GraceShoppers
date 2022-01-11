import axios from "axios";

//Action Type
const GET_PRODUCT = "GET_PRODUCT";

//Action Creators
const _getProduct = (product) => ({ type: GET_PRODUCT, product });

//Thunk
export const getProduct = (productId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/${productId}`);

    dispatch(_getProduct(res.data));
  } catch (error) {
    console.log(`Product not found ${error}`);
  }
};

//Reducer
export default function (state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return { ...state, ...action.product };
    default:
      return state;
  }
}
