import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  Button,
} from 'react-bootstrap';
import { _clearCart } from '../store/cart';

const Menu = () => {
  const { isLoggedIn, isAdmin } = useSelector((state) => {
    return {
      isLoggedIn: !!state.auth.id,
      isAdmin: state.auth.type === 'admin',
    };
  });

  const dispatch = useDispatch();

  return (
    <Navbar
      collapseOnSelect
      bg={isAdmin ? 'Yellow' : 'Green'}
      sticky="top"
      expand="md"
      className="py-sm py-0"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          House of Plants
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <NavDropdown title="Products">
                <NavDropdown.Item
                  as={Link}
                  to="/products"
                  id="collasible-nav-dropdown"
                >
                  All
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/plants">
                  Plants
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/pots">
                  Pots
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/tools">
                  Tools
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/apparel">
                  Apparel
                </NavDropdown.Item>
              </NavDropdown>
            </Nav.Item>
          </Nav>

          <Nav>
            <Nav.Item>
              <Nav.Link as={Link} to="/cart">
                My Cart
              </Nav.Link>
            </Nav.Item>

            {isLoggedIn ? (
              <Nav>
                {/* The navbar will show these links after you log in */}
                {isAdmin ? (
                  <Nav.Link as={Link} to="/home">
                    Admin
                  </Nav.Link>
                ) : (
                  <Nav.Link as={Link} to="/home">
                    Home
                  </Nav.Link>
                )}

                <Nav.Link
                  as={Link}
                  to="#"
                  onClick={() => {
                    dispatch(_clearCart());
                    dispatch(logout());
                  }}
                >
                  Logout
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                {/* The navbar will show these links before you log in */}
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
