import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const OrderThankYou = () => {
  return (
    <Container>
      <Card variant="info" border="success">
        <Card.Header>Thank you!</Card.Header>
        <Card.Body>
          <Card.Title>Order Summary</Card.Title>
          <Card.Text>
            Your order has been successfully placed, but will never arrive
            because House of Plants is not real. <br />
            Please feel free to buy <a href="/products/">More Products.</a>{' '}
            Might we recommend a <a href="/products/21">Gardening Gi</a>?
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrderThankYou;
