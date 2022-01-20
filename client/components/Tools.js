import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../store/products';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';

const Tools = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  let tools = products.filter(function (product) {
    return product.type === 'tool';
  });
  return tools.length ? (
    <Container fluid>
      <h2>Tools</h2>
      <Row>
        {tools.map((tool, i) => {
          return (
            <Col key={i}>
              <Card style={{ width: '18rem' }}>
                <Link to={`/products/${tool.id}`}>
                  <Card.Img src={tool.imageUrl} className="all-view-img" />
                </Link>
                <Card.Title>{tool.name}</Card.Title>
                <Card.Text>${tool.price / 100}</Card.Text>
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

export default Tools;
