import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import SingleProduct from './components/SingleProduct';
import AllProducts from './components/AllProducts';
import CartView from './components/CartView';
import AdminProductPanel from './components/AdminProductPanel';
import EditProduct from './components/EditProduct';
import OrderThankYou from './components/OrderThankYou';
import LandingPage from "./components/LandingPage";
import Plants from "./components/Plants";
import Tools from "./components/Tools";
import Apparel from "./components/Apparel";
import Pots from "./components/Pots";
import AdminUserPanel from './components/AdminUserPanel';

/**
 * COMPONENT For Routes
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/products" exact component={AllProducts} />
            <Route path="/plants" exact component={Plants} />
            <Route path="/pots" exact component={Pots} />
            <Route path="/tools" exact component={Tools} />
            <Route path="/apparel" exact component={Apparel} />
            <Route
              path="/products/:productId"
              exact
              component={SingleProduct}
            />
            <Route path="/cart" component={CartView} />
            <Route path="/home" component={Home} />
            <Route path="/thankYou" component={OrderThankYou} />
            {isAdmin && <Route path="/admin" component={AdminProductPanel} />}
            {isAdmin && <Route path="/users" component={AdminUserPanel} />}
            {isAdmin && (
              <Route path="/products/edit/:productId" component={EditProduct} />
            )}
            <Route path="/" exact component={LandingPage} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/products" exact component={AllProducts} />
            <Route path="/plants" exact component={Plants} />
            <Route path="/pots" exact component={Pots} />
            <Route path="/tools" exact component={Tools} />
            <Route path="/apparel" exact component={Apparel} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Route path="/" exact component={LandingPage} />
            <Route path="/login">
              <AuthForm formName="login" />{' '}
            </Route>
            <Route path="/signup">
              <AuthForm formName="signup" />
            </Route>
            <Route path="/cart" component={CartView} />
            <Route path="/thankYou" component={OrderThankYou} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.type === 'admin',
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
