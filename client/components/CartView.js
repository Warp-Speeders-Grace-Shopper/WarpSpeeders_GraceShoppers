import React, { useEffect } from 'react';
import { getCart } from '../store/cart';
import { useDispatch, useSelector } from 'react-redux';

const CartView = () => {
  const { id, username } = useSelector((state) => state.auth);
  //grab user ID and username from state

  const dispatch = useDispatch();
  useEffect(() => {
    if (id) dispatch(getCart(id));
  }, [id]);
  // when the page loads (and whenever user login changes), dispatch getCart
  const cart = useSelector((state) => state.cart);
  // put that cart in local scope

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
                </td>
                <td>
                  <h3>price</h3>
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
                    <td>{cartItem.Order_Product.quantity}</td>
                    <td>{cartItem.price}</td>
                    <td>
                      <button
                        type="button"
                        style={{ backgroundColor: 'pink' }}
                        onClick={() => handleRemove(cartItem)}
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
                    }
                  </h3>
                </td>
                <td>
                  <h3>
                    $
                    {
                      cart.reduce((accum, val) => {
                        return val.price + accum;
                      }, 0)
                      // this reduce sums up the total price of items in the cart.
                    }
                  </h3>
                </td>
                <td>
                  <button
                    type="button"
                    style={{ backgroundColor: 'lightyellow' }}
                    onClick={() => handleClearCart()}
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

function handleRemove(cartItem) {
  console.dir(cartItem);
}

function handleClearCart() {
  console.log(`clear cart pushed`);
}

export default CartView;
