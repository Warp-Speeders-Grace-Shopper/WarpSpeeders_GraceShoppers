import React, { useEffect, useState } from "react";
import { clearCart, getCart, removeItemFromCart, buyCart } from "../store/cart";
import { useDispatch, useSelector } from "react-redux";
import { editCart } from "../store/cart";
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
  const dispatch = useDispatch();
  const [emailInput, setEmailInput] = useState("");
  const [guestEmail, setGuestEmail] = useState("");

  const { id, username } = useSelector((state) => state.auth);

  //grab user ID and username from state
  let name = username ? username.split('@')[0] : username;

  const cart = useSelector((state) => state.cart);


  useEffect(() => {
    dispatch(getCart(id));
  }, [id]);

  function handleRemoveItem(cartItem, userId = 0) {
    dispatch(removeItemFromCart(cartItem, userId));
  }

  const handleEdit = (e, cartItem, userId = 0) => {
    cartItem = {
      ...cartItem,
      Order_Product: {
        ...cartItem.Order_Product,
        quantity: Number(e.target.value),
      },
    };
    console.log(cartItem);
    dispatch(editCart(cartItem, userId));
  };

  function handleClearCart(userId = 0) {
    dispatch(clearCart(userId));
  }

  function handleBuyCart(userId = 0, email = " ") {
    dispatch(buyCart(userId, email));
    history.push("/thankYou");
  }

  const handleChangeEmail = (e) => {
    setEmailInput(e.target.value);
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    console.log(emailInput);
    setGuestEmail(emailInput);
  };

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col>

            <h1>Cart for {name || 'Guest'}</h1>

          </Col>

          {cart[0] ? (
            <Col className="me-auto">
              <ButtonGroup className="ms-auto">
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
                          <select
                            name="quantity"
                            onChange={(e) => handleEdit(e, cartItem, id)}
                            value={cartItem.Order_Product.quantity}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                          </select>
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
                            onClick={() => handleRemoveItem(cartItem, id)}
                          >
                            Remove
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
                      <Button
                        variant="success"
                        onClick={() => handleBuyCart(id, guestEmail)}
                        disabled={!id && !guestEmail}
                      >
                        Buy Now
                      </Button>
                    </td>
                  </tr>
                </tfoot>
              </Table>
              {!id && !guestEmail && (
                <div>Please enter email below to check out as guest!</div>
              )}
              {!id && (
                <form onSubmit={handleSubmitEmail}>
                  <label htmlFor="email">Email: </label>
                  <input
                    type="text"
                    name="email"
                    value={emailInput}
                    onChange={handleChangeEmail}
                  ></input>
                  <button type="submit">Submit</button>
                </form>
              )}
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
