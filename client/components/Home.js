import React from 'react';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;
  let name = username ? username.split('@')[0] : username;

  return (
    <div>
      <Alert variant="primary" style={{ maxWidth: '25rem' }}>
        <Alert.Heading>Logged in</Alert.Heading> <h3>Welcome, {name}</h3>
        This is a React-bootstrap alert! If this is in a fancy blue box, it's
        working.
      </Alert>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
