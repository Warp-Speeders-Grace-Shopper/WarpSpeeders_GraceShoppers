import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/products";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const AdminProductPanel = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imageUrl: "",
    type: "",
    description: "",
  });

  const handleChange = (e) => {
    console.log(formData);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("New item added: ", formData);
    dispatch(addProduct(formData));
    setFormData({
      name: "",
      price: "",
      imageUrl: "",
      type: "",
      description: "",
    });
  };

  const { name, price, imageUrl, type, description } = formData;

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Add Product</Accordion.Header>
        <Accordion.Body>
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
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default AdminProductPanel;
