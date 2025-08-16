// src/pages/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' , phoneNumber:"" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/api/auth/register', formData);
      toast.success('Registration successful! Welcome!');
      // Optionally store user info/token in localStorage
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      navigate('/menu'); // Redirect to menu page after successful registration
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="pt-24 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-amber-900 mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />

            <input type="tel" name="phoneNumber" placeholder="Phone Number " onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" /> 
      <input type="password" name="password" /* ... */ />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
          <button type="submit" className="w-full bg-amber-800 text-white py-2 rounded-md hover:bg-amber-900 transition duration-300">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;