import React from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';
import Container from 'react-bootstrap/Container';

const App = () => {
  return (
    <Container fluid>
      <Navbar />
      <Routes />
    </Container>
  );
};

export default App;
