import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import history from "../history";
import { getProduct } from "../store/singleProduct";
import { editProduct, deleteProduct } from "../store/products";

const EditProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const singleProduct = useSelector((state) => state.singleProduct);
  //   const [formData, setFormData] = useState(singleProduct);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imageUrl: "",
    type: "",
    description: "",
  });

  useEffect(() => {
    dispatch(getProduct(Number(productId)));
  }, []);

  useEffect(() => {
    setFormData(singleProduct);
  }, [singleProduct]);

  const handleBack = () => {
    history.push("/admin");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(editProduct(formData));
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteProduct(productId));
    history.push("/admin");
  };

  const { name, price, imageUrl, type, description } = formData;

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={handleBack}>
          Back
        </button>
        <label htmlFor="name">Name</label>
        <input name="name" onChange={handleChange} value={name} />
        <label htmlFor="price">Price</label>
        <input name="price" onChange={handleChange} value={price} />
        <label htmlFor="imageUrl">Image Url</label>
        <input name="imageUrl" onChange={handleChange} value={imageUrl} />
        <label htmlFor="type">Type</label>
        <select name="type" onChange={handleChange} value={type}>
          <option value="plant">Plant</option>
          <option value="pot">Pot</option>
          <option value="tool">Tool</option>
          <option value="apparel">Apparel</option>
        </select>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          onChange={handleChange}
          value={description}
          rows="4"
          cols="50"
        />
        <button type="submit">Submit</button>
      </form>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default EditProduct;
