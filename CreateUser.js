import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    date: '',  // Ensure the date is handled in the state
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users', formData);
      alert('User added successfully');
      navigate('/');
    } catch (err) {
      console.error('Error adding user:', err);
      alert('Failed to add user');
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="bg-white rounded p-4 shadow w-50">
        <h2 className="mb-4 text-center">Add User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              id="age"
              placeholder="Enter age"
              className="form-control"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-success w-50" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
