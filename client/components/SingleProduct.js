import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../store/singleProduct";
import { useParams } from "react-router-dom";
import { addToCart } from "../store/cart";

export default function () {
  const dispatch = useDispatch();
  const { productId } = useParams();
  useEffect(() => {
    dispatch(getProduct(Number(productId)));
  }, []);
  const singleProduct = useSelector((state) => state.singleProduct);
  console.log(singleProduct);
  return (
    <div>
      <img src={singleProduct.imageUrl} style={{ maxWidth: "25rem" }} />
      <p> {singleProduct.name}</p>
      <p> {singleProduct.description}</p>
      <p> {singleProduct.price}</p>
      <button
        type="button"
        onClick={() => {
          addToCartHandler(singleProduct.id);
        }}
      >
        Add 1 to Cart
      </button>
    </div>
  );
  function addToCartHandler(productId) {
    //hardcoded adding to userId 2's cart - NOT current user.
    dispatch(addToCart(productId, 2));
  }
}
