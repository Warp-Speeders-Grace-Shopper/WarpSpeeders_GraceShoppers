import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/products";

const AdminProductPanel = ({ toggleAddProduct }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imageUrl: "",
    type: "",
    description: "",
  });

  const handleCancel = () => {
    setFormData({
      name: "",
      price: "",
      imageUrl: "",
      type: "",
      description: "",
    });
    toggleAddProduct();
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addProduct(formData));
    setFormData({
      name: "",
      price: "",
      imageUrl: "",
      type: "",
      description: "",
    });
    toggleAddProduct();
  };

  const { name, price, imageUrl, type, description } = formData;

  return (
    <div>
      <h3>Add New Product</h3>
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={handleCancel}>
          Cancel
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
    </div>
  );
};

export default AdminProductPanel;
