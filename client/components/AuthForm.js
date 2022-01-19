import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../store';

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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});
  //Submit Flag
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    name === 'username' ? setUsername(value) : setPassword(value);
  };
  //we need a handle submit function to handle the form submission because of what happens when you submit a form, we need to stop the default behavior of the form which is to refresh the page
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(username, password));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      dispatch(authenticate(username, password, formName));
    }
  }, [errors]);

  const validate = (username, password) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; //regex check for valid email
    if (!username) {
      errors.username = 'Username is required!';
    } else if (!regex.test(username)) {
      errors.username = 'This is not a valid email format!';
    }
    if (!password) {
      errors.password = 'Password is required!';
    }
    return errors;
  };

  return (
    <div>
      {/* <pre>{JSON.stringify({ username, password }, undefined, 2)}</pre> */}
      <form onSubmit={handleSubmit} name={formName}>
        <div>
          <label htmlFor="username">
            <small>Username/Email</small>
          </label>
          <input
            onChange={handleChange}
            name="username"
            type="text"
            value={username}
          />
        </div>
        <p>{errors.username}</p>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input
            onChange={handleChange}
            name="password"
            type="password"
            value={password}
          />
        </div>
        <p>{errors.password}</p>
        <div>
          <button type="submit">
            {formName === 'login'
              ? 'Login'
              : formName === 'signup'
              ? 'Sign Up'
              : null}
          </button>
        </div>
        {error && error.response && <div>{error.response.data}</div>}
      </form>
    </div>
  );
};

export default AuthForm;
