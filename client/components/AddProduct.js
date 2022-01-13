// Type: plant, pot, tool, apparelimport React, { useEffect } from "react";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../store/products";

const AdminProductPanel = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState( 
    { name: '', price: '', imageUrl: '', type: '', description: ''}
  );

  const handleClick = () => {
    console.log(formData);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const { name, price, imageUrl, type, description } = formData;

  return (
    <div>
      <h3>Add New Product</h3>
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={handleClick}>
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
