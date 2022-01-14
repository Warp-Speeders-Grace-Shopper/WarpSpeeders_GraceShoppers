import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../store/products";
import AddProduct from "./AddProduct";

const AdminProductPanel = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const toggleAddProduct = () => {
    setShowAddProduct(!showAddProduct);
  };

  return (
    <div>
      <h2>Admin Product Panel</h2>
      {!showAddProduct && (
        <button onClick={toggleAddProduct}>Add Product</button>
      )}
      {showAddProduct && <AddProduct toggleAddProduct={toggleAddProduct} />}
      {products.length && (
        <div>
          {products.map((product, i) => {
            return (
              <div key={i}>
                <img src={product.imageUrl} style={{ maxWidth: "10rem" }} />
                <div>{product.name}</div>
                <div>${product.price}</div>
                <Link to={`/products/edit/${product.id}`}>
                  <button>Edit</button>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminProductPanel;
