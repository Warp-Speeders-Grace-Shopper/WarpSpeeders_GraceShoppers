import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../store/products';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';

const Apparel = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  let clothes = products.filter(function (product) {
    return product.type === 'apparel';
  });
  return clothes.length ? (
    <Container fluid>
      <h2>Apparel</h2>
      <Row>
        {clothes.map((item, i) => {
          return (
            <Col key={i}>
              <Card style={{ width: '18rem' }}>
                <Link to={`/products/${item.id}`}>
                  <Card.Img
                    variant="top"
                    src={item.imageUrl}
                    className="all-view-img"
                  />
                </Link>
                <Card.Title>{item.name} </Card.Title>
                <Card.Text>${item.price / 100}</Card.Text>
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

export default Apparel;
