import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../store/singleProduct";
import { useParams } from "react-router-dom";
import { addToCart, addToGuestCart } from "../store/cart";

export default function () {
  const dispatch = useDispatch();
  const { productId } = useParams();
  useEffect(() => {
    dispatch(getProduct(Number(productId)));
  }, []);
  const singleProduct = useSelector((state) => state.singleProduct);
  const userId = useSelector((state) => state.auth.id);
  // console.log(singleProduct);
  return (
    <div>
      <img src={singleProduct.imageUrl} style={{ maxWidth: "25rem" }} />
      <p> {singleProduct.name}</p>
      <p> {singleProduct.description}</p>
      <p> ${(singleProduct.price)/100}</p>
      <button
        type="button"
        onClick={() => {
          addToCartHandler(singleProduct.id, userId);
        }}
      >
        Add 1 to Cart
      </button>
    </div>
  );
  function addToCartHandler(productId, userId = 0) {
    //hardcoded adding to userId 2's cart - NOT current user.
    if (userId === 0) {
      console.log(`adding to GUEST cart (not touching db!`);
      dispatch(addToGuestCart(productId));
    } else {
      console.log(`adding to USER cart (including db!)`);
      dispatch(addToCart(productId, userId));
    }
  }
}
