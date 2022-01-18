import React, { useEffect, useState } from "react";
import { clearCart, getCart, removeItemFromCart, buyCart } from "../store/cart";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import history from "../history";

const CartView = () => {
  const [editMode, toggleEditMode] = useState(false);

  const { id, username } = useSelector((state) => state.auth);
  //grab user ID and username from state

  const dispatch = useDispatch();
  useEffect(() => {
    // if (id) {
    dispatch(getCart(id));
    // }
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

  function handleBuyCart(userId = 0) {
    dispatch(buyCart(userId));
    history.push("/thankYou");
  }

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col>
            <h1>Cart for {username || "Guest"}</h1>
          </Col>

          {cart[0] ? (
            <Col className="me-auto">
              {editMode ? (
                <Button variant="success" disabled>
                  Buy Now
                </Button>
              ) : (
                <Button variant="success" onClick={() => handleBuyCart(id)}>
                  Buy Now
                </Button>
              )}
              <ButtonGroup className="ms-auto">
                {editMode ? (
                  <Button
                    onClick={() => {
                      console.log(
                        `this button should dispatch an action to update the user's cart!`
                      );
                      toggleEditMode(!editMode);
                    }}
                  >
                    {/* this button should update cart. i think it's easiest to pass the whole cart object to it*/}
                    Save Cart
                  </Button>
                ) : (
                  <Button
                    variant="warning"
                    onClick={() => toggleEditMode(!editMode)}
                  >
                    Edit Quantities
                  </Button>
                )}
                <Button
                  variant="danger"
                  style={{ maxWidth: "8rem" }}
                  onClick={() => handleClearCart(id)}
                >
                  Clear Cart
                </Button>
              </ButtonGroup>
            </Col>
          ) : (
            " "
          )}
        </Row>

        <div>
          {cart[0] ? (
            <Container fluid>
              <Table responsive>
                <thead>
                  <tr>
                    <td>Item name</td>
                    <td>Quantity</td>
                    <td>price each</td>
                    <td>subtotal</td>
                    <td>edit</td>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((cartItem, keyIndex) => {
                    return (
                      <tr key={keyIndex}>
                        <td>
                          <Image
                            src={cartItem.imageUrl}
                            style={{
                              maxWidth: "4rem",
                              maxHeight: "4rem",
                            }}
                          />{" "}
                          <a href={`products/${cartItem.id}`}>
                            {cartItem.name}
                          </a>
                        </td>
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
                        <td>${cartItem.price / 100}</td>
                        <td>
                          $
                          {(cartItem.price / 100) *
                            cartItem.Order_Product.quantity}
                        </td>

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
                      <h3>Grand Total:</h3>
                    </td>
                    <td>
                      <h3>
                        {
                          cart.reduce((accum, val) => {
                            return val.Order_Product.quantity + accum;
                          }, 0)
                          // this reduce sums up the total quantity of items in the cart.
                        }{" "}
                        Items
                      </h3>
                    </td>
                    <td></td>
                    <td>
                      <h3>
                        $
                        {
                          cart.reduce((accum, val) => {
                            return (
                              (val.price / 100) * val.Order_Product.quantity +
                              accum
                            );
                          }, 0)
                          // this reduce sums up the total price of items in the cart.
                        }
                      </h3>
                    </td>
                    <td>
                      {" "}
                      {editMode ? (
                        <Button variant="success" disabled>
                          Buy Now
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          onClick={() => handleBuyCart(id)}
                        >
                          Buy Now
                        </Button>
                      )}
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </Container>
          ) : (
            "Cart is empty. Buy some stuff!"
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CartView;
