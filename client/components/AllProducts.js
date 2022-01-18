import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../store/products";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";

const AllProducts = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return products.length ? (
    <Container>
    <Row>
      {products.map((product, i) => {
        return (
          <Col>
          <Card key={i} style={{ maxWidth: "20rem" }}>
            <Link to={`/products/${product.id}`}>
              <Card.Title>
                {product.name} ${(product.price)/100}
              </Card.Title>
              <Card.Img src={product.imageUrl} />
            </Link>
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
