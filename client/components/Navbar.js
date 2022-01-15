import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

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
      <Navbar bg="success" sticky="top" expand="sm" collapseOnSelect>
        <Navbar.Brand>
          <Nav.Link as={Link} to="/">
            House of Plants
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <NavDropdown title="Products">
              <NavDropdown.Item as={Link} to="/products">
                All Products
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
            <Nav.Link as={Link} to="/cart">
              My Cart
            </Nav.Link>
          </Nav>

          {isLoggedIn ? (
            <Nav className=".mr-auto">
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
            <Nav className=".mr-auto">
              {/* The navbar will show these links before you log in */}
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Sign Up
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Menu;
