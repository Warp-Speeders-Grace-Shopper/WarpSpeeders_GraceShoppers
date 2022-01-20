import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../store/products';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';

const Plants = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  let plants = products.filter(function (product) {
    return product.type === 'plant';
  });
  return plants.length ? (
    <Container fluid>
      <h2>Plants</h2>
      <Row>
        {plants.map((plant, i) => {
          return (
            <Col key={i}>
              <Card style={{ width: '18rem' }}>
                <Link to={`/products/${plant.id}`}>
                  <Card.Img
                    variant="top"
                    src={plant.imageUrl}
                    className="all-view-img"
                  />
                </Link>
                <Card.Title>{plant.name}</Card.Title>
                <Card.Text>${plant.price / 100}</Card.Text>
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

export default Plants;
