import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../store/products';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';

const AllProducts = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return products.length ? (
    <Container fluid>
      <h2>All Products</h2>
      <Row>
        {products.map((product, i) => {
          return (
            <Col key={i} sm>
              <Card style={{ width: '18rem' }}>
                <Link to={`/products/${product.id}`}>
                  <Card.Img src={product.imageUrl} className="all-view-img" />
                </Link>
                <Card.Title>{product.name} </Card.Title>
                <Card.Text>${product.price / 100}</Card.Text>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  ) : (
    <div>Loading</div>
  );
};

export default AllProducts;
