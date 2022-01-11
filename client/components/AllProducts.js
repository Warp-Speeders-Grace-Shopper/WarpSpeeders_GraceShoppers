import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../store/Products";

const AllProducts = () => {
  const products = useSelector((state) => state.products)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts())
  }, [])
  return(
    <div>All Products:{products.length? products[0].name : "Loading"}</div>
  )
}

export default AllProducts
