import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import history from '../history';
import { getCart, addToCart } from '../store/cart';
import { getOrders } from '../store/orders';
import { getProducts } from '../store/products';
import { getUsers } from '../store/users';

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

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const orders = useSelector((state) => state.currentOrders);
  const { cart } = useSelector((state) => state);
  const isAdmin = useSelector((state) => state.auth.type === 'admin');
  const { products } = useSelector((state) => state);

  useEffect(() => {
    if (isAdmin) dispatch(getUsers());
  });

  let totalCartItems = 0;
  if (cart[0])
    totalCartItems = cart.reduce((accum, currentEl) => {
      return accum + currentEl.Order_Product.quantity;
    }, 0);

  let users = [];
  if (isAdmin) {
    users = useSelector((state) => state.users);
  }

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
                  <Row>
                    <Col md="auto">
                      <Button
                        variant="warning"
                        onClick={() => {
                          history.push('/admin');
                        }}
                      >
                        Edit Inventory
                      </Button>{' '}
                    </Col>
                    <Col>
                      Add, remove, and edit items in the HoP inventory.
                      Currently: {products.length} different products in stock!.
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md="auto">
                      <Button
                        variant="warning"
                        onClick={() => {
                          history.push('/users');
                        }}
                      >
                        View Users
                      </Button>{' '}
                    </Col>
                    <Col>View registered customers</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item disabled>
                  <Row>
                    <Col md="auto">
                      <Button variant="secondary">Order History</Button>
                    </Col>
                    <Col>View a history of completed orders.</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Container>
      ) : (
        <Col lg={8}>
          <br />
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
                Your cart currently contains {totalCartItems} total items
                {/* {cart.length} unique items and{' '} */}
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
