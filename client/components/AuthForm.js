import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../store";

const AuthForm = ({ formName }) => {
  //the only thing we need from the store is the error so we get that using useSelector
  const { error } = useSelector((state) => {
    return {
      error: state.auth.error,
    };
  });

  //getting the actions from the store
  const dispatch = useDispatch();

  //local state for editing
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //we need a handle submit function to handle the form submission because of what happens when you submit a form, we need to stop the default behavior of the form which is to refresh the page
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authenticate(username, password, formName));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} name={formName}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
          />
        </div>
        <div>
          <button type="submit">
            {formName === "login"
              ? "Login"
              : formName === "signup"
              ? "Sign Up"
              : null}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

export default AuthForm;
