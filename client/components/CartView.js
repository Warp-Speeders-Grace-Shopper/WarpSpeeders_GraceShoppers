import React, { useEffect, useState } from 'react';
import { clearCart, getCart, removeItemFromCart } from '../store/cart';
import { useDispatch, useSelector } from 'react-redux';

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
    <div>
      <h1>Cart for {username || 'Guest'}</h1>
      {/* heading will show username or "guest" if logged out*/}
      <div>
        {cart[0] ? (
          <table>
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
                    <td>{cartItem.price}</td>
                    <td>${cartItem.price * cartItem.Order_Product.quantity}</td>
                    <td>
                      <button
                        type="button"
                        style={{ backgroundColor: 'pink' }}
                        onClick={() => handleRemove(cartItem, id)}
                      >
                        X remove
                      </button>
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
                        return val.price * val.Order_Product.quantity + accum;
                      }, 0)
                      // this reduce sums up the total price of items in the cart.
                    }
                  </h3>
                </td>
                <td>
                  <button
                    type="button"
                    style={{ backgroundColor: 'lightyellow' }}
                    onClick={() => handleClearCart(id)}
                  >
                    Clear Cart
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        ) : (
          'Cart is empty. Buy some stuff!'
        )}
      </div>
    </div>
  );
};

export default CartView;
