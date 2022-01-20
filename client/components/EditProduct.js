import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import history from "../history";
import { getProduct } from "../store/singleProduct";
import { editProduct, deleteProduct } from "../store/products";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

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
    setFormData({
      ...formData,
      price: Number(formData.price),
    });
    dispatch(editProduct(formData));
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteProduct(productId));
    history.push("/admin");
  };

  const { name, price, imageUrl, type, description } = formData;

  return (
    <Container fluid>
      <h2>Edit Product</h2>
      <Button variant="secondary" onClick={handleBack}>
        Back
      </Button>
      <br></br>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
      <Form onSubmit={handleSubmit}>
        <FormGroup as={Row} controlId="formGridName">
          <FormLabel>Name</FormLabel>
          <FormControl
            type="text"
            name="name"
            onChange={handleChange}
            value={name}
          />
        </FormGroup>
        <FormGroup as={Row} controlId="formGridPrice">
          <FormLabel>Price</FormLabel>
          <FormControl
            type="text"
            name="price"
            onChange={handleChange}
            value={price}
          />
        </FormGroup>
        <FormGroup as={Row} controlId="formGridImageUrl">
          <FormLabel>Image URL</FormLabel>
          <FormControl
            type="text"
            name="imageUrl"
            onChange={handleChange}
            value={imageUrl}
          />
        </FormGroup>
        <Form.Group as={Row} controlId="formGridType">
          <Form.Label>Type</Form.Label>
          <Form.Select
            name="type"
            defaultValue="plant"
            onChange={handleChange}
            value={type}
          >
            <option value="plant">Plant</option>
            <option value="pot">Pot</option>
            <option value="tool">Tool</option>
            <option value="apparel">Apparel</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Row} controlId="formGridDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            onChange={handleChange}
            value={description}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default EditProduct;
