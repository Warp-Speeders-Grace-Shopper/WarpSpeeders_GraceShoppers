import React from "react";
import { Container, Carousel } from "react-bootstrap";

export default function LandingPage() {
  return (
    <Container fluid h-100>
      <h2>Welcome to our Greenhouse</h2>

      <Carousel>
        <Carousel.Item interval={5000}>
          <img
            className="rounded w-100 "
            src="https://images.unsplash.com/photo-1601985705806-5b9a71f6004f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhbnQlMjBzaG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1581573025746-0ee51aef032a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGxhbnQlMjBzaG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBsYW50c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}
