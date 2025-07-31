// Frontend: FoodManagement.js (React)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminFoodManagement.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FoodManagement() {
  const [foods, setFoods] = useState([]);
  const [form, setForm] = useState({
  name: '',
  description: '',
  price: '',
  image: null,
  category: '',
  veg: true,
  restaurant: '',
  rating: 0,
  numReviews: 0
});

  const [editingId, setEditingId] = useState(null);

  const fetchFoods = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/category-foods');
      setFoods(res.data);
    } catch (error) {
      toast.error('Failed to load foods.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      if (editingId) {
        await axios.put(`http://localhost:5000/api/category-foods/${editingId}`, formData, config);
        toast.success('Updated Successfully');
      } else {
        await axios.post('http://localhost:5000/api/category-foods', formData, config);
        toast.success('Added Successfully');
      }

      setForm({ name: '', description: '', price: '', image: null, category: '', veg: true, restaurant: '', rating: 0 });
      setEditingId(null);
      fetchFoods();
    } catch (error) {
      toast.error('Operation failed.');
    }
  };

  const handleEdit = (food) => {
    setForm({ ...food, image: null }); // Avoid setting old image as file
    setEditingId(food._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this food item?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/category-foods/${id}`);
      toast.success('Deleted Successfully');
      fetchFoods();
    } catch (error) {
      toast.error('Deletion failed.');
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div className="food-management-container">
      <ToastContainer position="top-right" />
      <h1>Food Management</h1>

      <form onSubmit={handleSubmit} className="food-form" encType="multipart/form-data">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Food Name" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" required />
        <input name="image" type="file" onChange={handleFileChange} accept="image/*" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
        <input name="restaurant" value={form.restaurant} onChange={handleChange} placeholder="Restaurant" />
       <input
  name="rating"
  value={form.rating}
  onChange={handleChange}
  placeholder="Rating (e.g., 4.5)"
  type="number"
  min="0"
  max="5"
  step="0.1"
/>
<input
  name="numReviews"
  value={form.numReviews}
  onChange={handleChange}
  placeholder="Number of Reviews"
  type="number"
  min="0"
/>

        <label>
          <input type="checkbox" name="veg" checked={form.veg} onChange={handleChange} />
          <span className="ms-2">Veg</span>
        </label>
        <button type="submit">
          {editingId ? 'Update Food' : 'Add Food'}
        </button>
      </form>

      <div className="table-responsive">
        <table className="food-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Restaurant</th>
              <th>Veg</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map(food => (
              <tr key={food._id}>
                <td>{food.name}</td>
                <td>₹{food.price}</td>
                <td>{food.category}</td>
                <td>{food.restaurant}</td>
                <td>{food.veg ? 'Yes' : 'No'}</td>
                <td>{food.rating}</td>
                <td>
                  <button onClick={() => handleEdit(food)} className="text-blue">Edit</button>
                  <button onClick={() => handleDelete(food._id)} className="text-red ms-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FoodManagement;
