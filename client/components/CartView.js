import React, { useEffect, useState } from 'react';
import { clearCart, getCart, removeItemFromCart } from '../store/cart';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const CartView = () => {
  const [editMode, toggleEditMode] = useState(false);

  const { id, username } = useSelector((state) => state.auth);
  //grab user ID and username from state

  const dispatch = useDispatch();
  useEffect(() => {
    if (id) dispatch(getCart(id));
  }, [id]);
  // when the page loads (and whenever user login changes), dispatch getCart
  const cart = useSelector((state) => state.cart);
  // put that cart in local scope

  function handleRemove(cartItem, userId = 0) {
    // removes individual items from cart
    dispatch(removeItemFromCart(cartItem, userId));
  }

  function handleClearCart(userId = 0) {
    // removes all items from user cart
    dispatch(clearCart(userId));
  }

  return (
    <Container>
      <h1>Cart for {username || 'Guest'}</h1>
      {/* heading will show username or "guest" if logged out*/}
      <div>
        {cart[0] ? (
          <Table responsive>
            {/* this table layout is not pretty but it should be easy to refactor*/}
            <thead>
              <tr>
                <td>
                  <h3>Item name</h3>
                </td>
                <td>
                  <h3> quantity</h3>
                  {editMode ? (
                    <button
                      onClick={() => {
                        console.log(
                          `this button should dispatch an action to update the user's cart!`
                        );
                        toggleEditMode(!editMode);
                      }}
                    >
                      {/* this button should update cart. i think it's easiest to pass the whole cart object to it*/}
                      Save Cart
                    </button>
                  ) : (
                    <button onClick={() => toggleEditMode(!editMode)}>
                      Edit Quantities
                    </button>
                  )}
                </td>
                <td>
                  <h3>price each</h3>
                </td>
                <td>
                  <h3>subtotal</h3>
                </td>
                <td>
                  <h3>edit</h3>
                </td>
              </tr>
            </thead>
            <tbody>
              {cart.map((cartItem, keyIndex) => {
                return (
                  <tr key={keyIndex}>
                    <td>{cartItem.name}</td>
                    <td>
                      {editMode ? (
                        <input
                          type="text"
                          defaultValue={cartItem.Order_Product.quantity}
                        />
                      ) : (
                        cartItem.Order_Product.quantity
                      )}
                    </td>
                    <td>${cartItem.price / 100}</td> {/*price per item */}
                    <td>
                      $
                      {(cartItem.price / 100) * cartItem.Order_Product.quantity}
                    </td>{' '}
                    {/*subtotal for this item */}
                    <td>
                      <Button
                        variant="outline-danger"
                        onClick={() => handleRemove(cartItem, id)}
                      >
                        X remove
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <h3>totals</h3>
                </td>
                <td>
                  <h3>
                    {
                      cart.reduce((accum, val) => {
                        return val.Order_Product.quantity + accum;
                      }, 0)
                      // this reduce sums up the total quantity of items in the cart.
                    }{' '}
                    items
                  </h3>
                </td>
                <td> </td>
                <td>
                  <h3>
                    $
                    {
                      cart.reduce((accum, val) => {
                        return (
                          (val.price / 100) * val.Order_Product.quantity + accum
                        );
                      }, 0)
                      // this reduce sums up the total price of items in the cart.
                    }
                  </h3>
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleClearCart(id)}>
                    Clear Cart
                  </Button>
                </td>
              </tr>
            </tfoot>
          </Table>
        ) : (
          'Cart is empty. Buy some stuff!'
        )}
      </div>
    </Container>
  );
};

export default CartView;
