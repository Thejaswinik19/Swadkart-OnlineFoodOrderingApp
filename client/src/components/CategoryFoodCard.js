import React from 'react';
import './CategoryFoodCard.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryFoodCard = ({ food }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const addToCart = async () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/cart/add', {
        userId: user._id,
        item: {
          foodId: food._id,
          name: food.name,
          imageUrl: food.image,
          price: food.price,
          quantity: 1,
          restaurant: food.restaurant
        }
      });

      toast.success('Added to cart!');
    } catch (err) {
      console.error(err);
      toast.error('Error adding to cart');
    }
  };

  return (
   
    <div className="card food-card h-100 shadow-sm">
       <ToastContainer />
      <img
        src={
          food.image.startsWith('http')
            ? food.image
            : `http://localhost:5000/images/${food.image}`
        }
        className="card-img-top food-image"
        alt={food.name}
      />

      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">{food.name}</h5>
            <span className="text-warning fw-bold">₹{food.price}</span>
          </div>
          <p className="card-text text-muted mt-2">{food.description}</p>
          <p className="mb-1"><strong>Category:</strong> {food.category}</p>
          <p className="mb-1"><strong>Restaurant:</strong> {food.restaurant}</p>
          <div className="d-flex align-items-center text-warning">
            <span>⭐ {food.rating}</span>
            <small className="ms-1 text-muted">({food.numReviews} reviews)</small>
          </div>
          <span className={`badge mt-2 ${food.veg ? 'bg-success' : 'bg-danger'}`}>
            {food.veg ? 'Veg' : 'Non-Veg'}
          </span>
        </div>
        <button className="custom-cart-button mt-3" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CategoryFoodCard;
