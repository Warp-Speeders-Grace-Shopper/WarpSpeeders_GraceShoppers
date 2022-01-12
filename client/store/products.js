import axios from 'axios'

//Action Types

const GET_PRODUCTS = 'GET_PRODUCTS'

//Action Creators

const _getProducts = (products) => ({
  type: GET_PRODUCTS,
  products
})

//Thunks

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(_getProducts(data))
    } catch (err) {
      console.log(err)
    }
  }
}

//Reducer

const initialState = []

export default function products (state = initialState, action) {
  switch(action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
