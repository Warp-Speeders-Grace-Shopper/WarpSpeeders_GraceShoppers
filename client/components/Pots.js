import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../store/products";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";

const Pots = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

let pots = products.filter(function (product) {
    return product.type === "pot";
})
  return pots.length ? (
    <Container fluid>
      <h2>Pots</h2>
    <Row>
      {pots.map((pot, i) => {
        return (
          <Col key={i}>
            <Card style={{width: "18rem"}}>
            <Link to={`/products/${pot.id}`}>
              <Card.Img variant="top" src={pot.imageUrl} />
            </Link>
              <Card.Title>{pot.name}</Card.Title>
              <Card.Text>${(pot.price)/100}</Card.Text>
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

export default Pots;
