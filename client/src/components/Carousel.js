import React from 'react';
import { Carousel } from 'react-bootstrap';
import friends from '../assets/friends-eating.jpg';
import family from '../assets/family-dinner.jpg';
import delivery from '../assets/delivery-happy.jpg';
import './CarouselComp.css'; // import the CSS file

const CarouselComp = () => {
  return (
    <div className="carousel-container">
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100 carousel-image" src={friends} alt="Friends Eating" />
          <Carousel.Caption>
            <h5>Good Times, Great Food</h5>
            <p>Enjoy every moment together with delicious meals</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 carousel-image" src={family} alt="Family Dinner" />
          <Carousel.Caption>
            <h5>Family Feasts</h5>
            <p>Warm meals for every special family gathering</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 carousel-image" src={delivery} alt="Food Delivery" />
          <Carousel.Caption>
            <h5>Fast & Friendly Delivery</h5>
            <p>Bringing joy to your doorstep, one meal at a time</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselComp;
