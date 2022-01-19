import React from 'react';
import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

/**
 * COMPONENT
 */
const Home = () => {
  const { id, email } = useSelector((state) => state.auth);

  return (
    <Container>
      <Alert variant="success" style={{ maxWidth: '25rem' }}>
        Successfully logged in as {email}
      </Alert>
      <Card>
        <Card.Title>Welcome, {email}</Card.Title>
        <Card.Text>hi</Card.Text>
      </Card>
    </Container>
  );
};

export default Home;
