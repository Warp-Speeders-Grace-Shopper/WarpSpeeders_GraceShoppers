import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import history from '../history';
import { getCart, addToCart } from '../store/cart';
import { getOrders } from '../store/orders';

/**
 * COMPONENT
 */
const Home = () => {
  const dispatch = useDispatch();
  const { id, username } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCart(id));
  }, []);

  useEffect(() => {
    dispatch(getOrders(id));
  }, []);

  const orders = useSelector((state) => state.currentOrders);
  const { cart } = useSelector((state) => state);
  const isAdmin = useSelector((state) => state.auth.type === 'admin');

  return (
    <Container>
      {isAdmin ? (
        <Container fluid>
          <Alert variant="success" style={{ maxWidth: '25rem' }}>
            Successfully logged in as {username}. You have admin privileges.
          </Alert>
          <Col lg={8}>
            <Card bg="warning">
              <Card.Body>
                <Card.Title>Admin Control Panel</Card.Title>
                <Card.Text>You're the captain here:</Card.Text>
              </Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  <Button
                    variant="warning"
                    onClick={() => {
                      history.push('/admin');
                    }}
                  >
                    Edit Inventory
                  </Button>{' '}
                  Add, remove, and edit items in the HoP inventory.
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    variant="warning"
                    onClick={() => {
                      history.push('/users');
                    }}
                  >
                    View Users
                  </Button>{' '}
                  House of Plants currently has XX registered customers.
                </ListGroup.Item>
                <ListGroup.Item disabled>
                  <Button variant="secondary">Order History</Button> There have
                  been a total of YY completed orders.
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Container>
      ) : (
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
                  history.push('/products');
                }}
              >
                Start Shopping
              </Button>
            </Card.Body>
            <ListGroup>
              <ListGroup.Item>
                <Button
                  variant="secondary"
                  onClick={() => {
                    history.push('/cart');
                  }}
                >
                  View Cart
                </Button>{' '}
                Your cart currently contains {cart.length} unique items
              </ListGroup.Item>
              <ListGroup.Item disabled>
                <Button disabled variant="outline-secondary">
                  Order History
                </Button>{' '}
                You have placed{' '}
                {orders.filter((order) => order.status === 'complete').length}{' '}
                orders with House of Plants.
              </ListGroup.Item>
              <ListGroup.Item disabled>
                <Button variant="outline-secondary" disabled>
                  Edit Account
                </Button>{' '}
                Update your Account email address
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      )}
    </Container>
  );
};

export default Home;
