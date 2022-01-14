import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import SingleProduct from './components/SingleProduct';
import AllProducts from './components/AllProducts';
import CartView from './components/CartView';

/**
 * COMPONENT
 */
const Routes = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.auth.id);

  useEffect(() => {
    dispatch(me());
  }, [isLoggedIn]);

  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route path="/products" exact component={AllProducts} />
          <Route path="/products/:productId" component={SingleProduct} />
          <Route path="/cart" component={CartView} />
          <Route path="/home" component={Home} />
          <Redirect to="/home" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/products" exact component={AllProducts} />
          <Route path="/products/:productId" component={SingleProduct} />
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/cart" component={CartView} />
        </Switch>
      )}
    </div>
  );
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes);
