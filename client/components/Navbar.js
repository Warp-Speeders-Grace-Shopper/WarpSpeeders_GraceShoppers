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
    <div>
      <Navbar bg="Green" sticky="top" expand="md" collapseOnSelect>
        <Container fluid>
          <Navbar.Brand>
            <Nav.Link as={Link} to="/">
              House of Plants
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Find"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="light">Search</Button>
            </Form>
            <Nav>
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
              <Nav.Item>
                <Nav.Link as={Link} to="/cart">
                  My Cart
                </Nav.Link>
              </Nav.Item>
              <Nav />
              <Nav.Item>
                {isLoggedIn ? (
                  <Nav>
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
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Menu;
