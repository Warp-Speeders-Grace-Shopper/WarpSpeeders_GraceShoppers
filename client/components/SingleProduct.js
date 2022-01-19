import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../store/singleProduct';
import { useParams } from 'react-router-dom';
import { addToCart } from '../store/cart';
import {
  Card,
  Stack,
  Row,
  Col,
  Image,
  Container,
  ButtonGroup,
  Button,
} from 'react-bootstrap';

export default function () {
  const dispatch = useDispatch();
  const { productId } = useParams();
  useEffect(() => {
    dispatch(getProduct(Number(productId)));
  }, []);
  const { singleProduct } = useSelector((state) => state);
  const userId = useSelector((state) => state.auth.id);
  // console.log(singleProduct);
  function addToCartHandler(productId, quantity = 1, userId = 0) {
    dispatch(addToCart(productId, quantity, userId));
  }
  return (
    <Container>
      <Card.Header as="h2" className="text-center">
        {singleProduct.name}
      </Card.Header>
      <Stack direction="horizontal">
        <Col>
          <img
            className="singleProduct-img"
            variant="left"
            src={singleProduct.imageUrl}
          />
        </Col>

        <Card className="mb-20">
          <Card.Text className="p-1 mb-20">
            {singleProduct.description}
          </Card.Text>
          <Card.Text>${singleProduct.price / 100} </Card.Text>
          <Button
            className="p-1 m-1 bg-Green"
            type="button"
            onClick={() => {
              addToCartHandler(singleProduct.id, 1, userId);
            }}
          >
            Add 1 to Cart
          </Button>
          <Button
            className="p-1 m-1 bg-Green"
            type="button"
            onClick={() => {
              addToCartHandler(singleProduct.id, 5, userId);
            }}
          >
            Add 5 to Cart
          </Button>
        </Card>
      </Stack>
    </Container>
  );
}
