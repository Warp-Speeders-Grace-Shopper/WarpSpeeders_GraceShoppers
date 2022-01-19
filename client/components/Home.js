import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import history from '../history';
/**
 * COMPONENT
 */
const Home = () => {
  const { id, username } = useSelector((state) => state.auth);

  return (
    <Container>
      <Alert variant="success" style={{ maxWidth: '25rem' }}>
        Successfully logged in as {username}
      </Alert>
      <Col lg={8}>
        <Card variant="success" border="success">
          <Card.Body>
            <Card.Title>Welcome, {username}</Card.Title>
            <Card.Text>
              Thank you for being a House of Plants customer!
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => {
                history.pushState('/products');
              }}
            >
              Start Shopping
            </Button>
          </Card.Body>
          <ListGroup>
            <ListGroup.Item disabled>
              <Button variant="secondary" disabled>
                View Cart
              </Button>{' '}
              Your cart currently has () items
            </ListGroup.Item>
            <ListGroup.Item disabled>
              <Button variant="secondary" disabled>
                Order History
              </Button>{' '}
              You have placed () orders with House of Plants.
            </ListGroup.Item>
            <ListGroup.Item disabled>
              <Button variant="secondary" disabled>
                Edit Account
              </Button>{' '}
              Update your Account email address
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Container>
  );
};

export default Home;
