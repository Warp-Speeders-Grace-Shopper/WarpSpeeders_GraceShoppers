import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  Button,
} from "react-bootstrap";

const Menu = () => {
  const { isLoggedIn, isAdmin } = useSelector((state) => {
    return {
      isLoggedIn: !!state.auth.id,
      isAdmin: state.auth.type === "admin",
    };
  });

  const dispatch = useDispatch();

  return (
    <Navbar
      collapseOnSelect
      bg="Green"
      sticky="top"
      expand="md"
      className="py-sm py-0"
    >
      <Container fluid>
        <Nav className="flex-row justify-content-evenly">
          <Nav.Link as={Link} to="/">
            House of Plants
          </Nav.Link>
          <Form className="d-flex h-25 w-50 mt-3 mb-3">
            <Form.Control
              type="search"
              placeholder="Find"
              aria-label="Search"
              className="me-2"
            />
            <Button variant="light">Search</Button>
          </Form>
        </Nav>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-between"
        >
          <Nav>
            <Nav.Item className="d-flex flex-row">
              <Nav.Item>
                <NavDropdown title="Products">
                  <NavDropdown.Item as={Link} to="/products">
                    All
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/products/plants">
                    Plants
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/products/tools">
                    Tools
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/products/apparel">
                    Apparel
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>
            </Nav.Item>
          </Nav>

          <Nav.Item className="d-flex flex-row">
            <Nav.Item>
              <Nav.Link as={Link} to="/cart">
                My Cart
              </Nav.Link>
            </Nav.Item>

            {isLoggedIn ? (
              <Nav.Item className="d-flex flex-row">
                {/* The navbar will show these links after you log in */}
                <Nav.Link as={Link} to="/home">
                  Home
                </Nav.Link>
                {isAdmin && (
                  <Nav.Link as={Link} to="/admin">
                    Admin
                  </Nav.Link>
                )}
                <a to="#" onClick={() => dispatch(logout())}>
                  Logout
                </a>
              </Nav.Item>
            ) : (
              <Nav.Item className="d-flex flex-row">
                {/* The navbar will show these links before you log in */}
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav.Item>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
