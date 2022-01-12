import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../store/singleProduct";
import { useParams } from "react-router-dom";

export default function () {
  const dispatch = useDispatch();
  const { productId } = useParams();
  useEffect(() => {
    dispatch(getProduct(Number(productId)));
  }, []);
  const singleProduct = useSelector((state) => state.singleProduct);
  console.log(singleProduct);
  return (
    <div className="SingleProduct-container">
      <img src={singleProduct.imageUrl} className="SingleProduct-img" />
      <p> {singleProduct.name}</p>
      <p> {singleProduct.description}</p>
      <p> {singleProduct.price}</p>
    </div>
  );
}
