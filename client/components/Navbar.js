import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = () => {
  const { isLoggedIn, isAdmin } = useSelector((state) => {
    return {
      isLoggedIn: !!state.auth.id,
      isAdmin: state.auth.type === "admin",
    };
  });

  const dispatch = useDispatch();

  return (
    <div>
      <Link to="/">
        <h1>House of Plants</h1>
      </Link>

      <nav>
        <Link to="/products">Products</Link>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            {isAdmin && <Link to="/admin">Admin</Link>}
            <a href="#" onClick={() => dispatch(logout())}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
        <Link to="/cart">My Cart</Link>
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
