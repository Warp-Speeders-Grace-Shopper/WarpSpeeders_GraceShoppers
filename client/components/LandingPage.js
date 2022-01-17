import React from 'react';
import { Container, Carousel } from 'react-bootstrap';

export default function LandingPage() {
  return (
    <Container className="p-3 mb-20">
      <Carousel className="w-100">
        <Carousel.Item interval={5000} className="w-100">
          <img
            className="rounded w-100"
            src="https://images.unsplash.com/photo-1601985705806-5b9a71f6004f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhbnQlMjBzaG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>A wide variety of plants</h3>
            <p>We have a solution for every need.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="rounded w-100"
            src="https://images.unsplash.com/photo-1581573025746-0ee51aef032a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGxhbnQlMjBzaG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Tools, pots and much more...</h3>
            <p>Gardening tools, to potting containers. We have you covered</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="rounded w-100"
            src="https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBsYW50c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Bring your imagination to life.</h3>
            <p>A wide selection of indoor plants.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}
