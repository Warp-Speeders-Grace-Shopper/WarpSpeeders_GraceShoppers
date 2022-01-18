import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../store/products";
import { Link } from "react-router-dom";

const Pots = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

let pots = products.filter(function (product) {
    return product.type === "pot";
})
  return pots.length ? (
    <div>
      {pots.map((pot, i) => {
        return (
          <div key={i}>
            <Link to={`/products/${pot.id}`}>
              <div>
                {pot.name} ${(pot.price)/100}
              </div>
              <img src={pot.imageUrl} style={{ maxWidth: "10rem" }} />
            </Link>
          </div>
        );
      })}
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default Pots;
