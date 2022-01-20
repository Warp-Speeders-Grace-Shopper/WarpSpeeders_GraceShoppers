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
    <Container fluid sm>
      <Row>
        <Card.Header as="h2" className="text-center">
          {singleProduct.name}
        </Card.Header>
      </Row>
      <Stack gap={3} className="col-md-5 mx-auto">
        <Card className="mb-20" maxw-50>
          <Image
            variant="left"
            src={singleProduct.imageUrl}
            className="singleProduct-img rounded mx-auto d-block"
          />
          <Card.Text className="p-1 mb-20">
            {singleProduct.description}
          </Card.Text>
          <Card.Text>${singleProduct.price / 100} </Card.Text>
          <Stack gap={2} className="col-md-5 mx-auto">
            <Button
              className="p-1 m-3 bg-Green"
              type="button"
              onClick={() => {
                addToCartHandler(singleProduct.id, 1, userId);
              }}
            >
              Add 1 to Cart
            </Button>
            <Button
              className="p-1 m-3 bg-Green"
              type="button"
              onClick={() => {
                addToCartHandler(singleProduct.id, 5, userId);
              }}
            >
              Add 5 to Cart
            </Button>
          </Stack>
        </Card>
        <Col></Col>
      </Stack>
    </Container>
  );
}
