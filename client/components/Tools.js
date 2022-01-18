import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../store/products";
import { Link } from "react-router-dom";

const Tools = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

let tools = products.filter(function (product) {
    return product.type === "tool";
})
  return tools.length ? (
    <div>
      {tools.map((tool, i) => {
        return (
          <div key={i}>
            <Link to={`/products/${tool.id}`}>
              <div>
                {tool.name} ${(tool.price)/100}
              </div>
              <img src={tool.imageUrl} style={{ maxWidth: "10rem" }} />
            </Link>
          </div>
        );
      })}
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default Tools;
