import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../store/Products";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const products = useSelector((state) => state.products)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts())
  }, [])
  return(
    products.length ?
    <div>{products.map((product, i) => {
      return (
      <div key={i}>
      <Link to={`/products/${product.id}`}>
      <div>{product.name} ${product.price}</div>
      <img src={product.imageUrl} style={{maxWidth:"10rem"}}/>
      </Link>
      </div>)
    })}</div> : <div>Loading</div>
  )
}

export default AllProducts
