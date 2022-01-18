import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../store/products";
import { Link } from "react-router-dom";

const Plants = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

let plants = products.filter(function (product) {
    return product.type === "plant";
})
  return plants.length ? (
    <div>
      {plants.map((plant, i) => {
        return (
          <div key={i}>
            <Link to={`/products/${plant.id}`}>
              <div>
                {plant.name} ${(plant.price)/100}
              </div>
              <img src={plant.imageUrl} style={{ maxWidth: "10rem" }} />
            </Link>
          </div>
        );
      })}
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default Plants;
