import React, { useEffect } from 'react';
import { getCart } from '../store/cart';
import { useDispatch, useSelector } from 'react-redux';

const CartView = () => {
  const { id, username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) dispatch(getCart(id));
  }, [id]);
  const cart = useSelector((state) => state.cart);

  return (
    <div>
      <h1>Cart for {username || 'Guest'}</h1>
      <div>
        {cart[0] ? (
          <table>
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
              </tr>
            </thead>
            <tbody>
              {cart.map((cartItem, keyIndex) => {
                return (
                  <tr key={keyIndex}>
                    <td>{cartItem.name}</td>
                    <td>{cartItem.Order_Product.quantity}</td>
                    <td>{cartItem.price}</td>
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
