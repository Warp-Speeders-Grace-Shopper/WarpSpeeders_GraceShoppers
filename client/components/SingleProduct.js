import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../store/singleProduct';
import { useParams } from 'react-router-dom';
import { addToCart } from '../store/cart';
import { Card, Container, Row, Col } from 'react-bootstrap';

export default function () {
  const dispatch = useDispatch();
  const { productId } = useParams();
  useEffect(() => {
    dispatch(getProduct(Number(productId)));
  }, []);
  const { singleProduct } = useSelector((state) => state);
  const userId = useSelector((state) => state.auth.id);
  // console.log(singleProduct);
  return (
    <Container fluid>
      <Row></Row>
      <Card style={{ width: '35rem' }}>
        <Card.Header>{singleProduct.name}</Card.Header>
        <Card>
          <Card.Img variant="left" src={singleProduct.imageUrl} />
        </Card>
        <Col>
          <Card.Body>
            <Card.Text>{singleProduct.description}</Card.Text>
          </Card.Body>
        </Col>
      </Card>

      <p> ${singleProduct.price / 100}</p>
      <button
        type="button"
        onClick={() => {
          addToCartHandler(singleProduct.id, 1, userId);
        }}
      >
        Add 1 to Cart
      </button>
      <button
        type="button"
        onClick={() => {
          addToCartHandler(singleProduct.id, 5, userId);
        }}
      >
        Add 5 to Cart
      </button>
    </Container>
  );
  function addToCartHandler(productId, quantity = 1, userId = 0) {
    dispatch(addToCart(productId, quantity, userId));
  }
}
