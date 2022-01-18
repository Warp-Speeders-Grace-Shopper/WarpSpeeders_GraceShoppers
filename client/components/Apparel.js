import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../store/products";
import { Link } from "react-router-dom";

const Apparel = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

let clothes = products.filter(function (product) {
    return product.type === "apparel";
})
  return clothes.length ? (
    <div>
      {clothes.map((item, i) => {
        return (
          <div key={i}>
            <Link to={`/products/${item.id}`}>
              <div>
                {item.name} ${(item.price)/100}
              </div>
              <img src={item.imageUrl} style={{ maxWidth: "10rem" }} />
            </Link>
          </div>
        );
      })}
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default Apparel;
