import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { getUsers } from '../store/users';

const AdminUserPanel = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return users.length ? (
    <Container fluid>
      <h2>Admin User Panel</h2>
      <Row>
        {users.map((user) => {
          return (
            <Col key={user.id} xs={3}>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Text>
                    {user.id} {user.username}
                  </Card.Text>
                </Card.Body>
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

export default AdminUserPanel;
