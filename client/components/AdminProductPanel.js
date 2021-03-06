import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts } from '../store/products';
import AddProduct from './AddProduct';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const AdminProductPanel = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <Container fluid>
      <Link to={'/users'}> Users </Link>
      <h2>Admin Product Panel</h2>
      <AddProduct />
      {products.length && (
        <Row>
          {products.map((product) => {
            return (
              <Col key={product.id} sm>
                <Card style={{ width: '18rem' }}>
                  <Card.Img
                    variant="top"
                    src={product.imageUrl}
                    className="all-view-img"
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>${product.price / 100}</Card.Text>
                    <Link to={`/products/edit/${product.id}`}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default AdminProductPanel;
