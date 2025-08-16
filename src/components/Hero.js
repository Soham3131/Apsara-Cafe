// src/components/Hero.js
import React from 'react';
// This assumes you have an image in src/assets. You can download one or use a direct URL.
// For example: const heroImageUrl = 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8';
import heroImage from '../assets/cafe_hero.jpg'; // We will create this file next
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div 
      className="relative h-screen bg-cover bg-center flex items-center justify-center text-white" 
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center px-4">
        <h2 className="text-5xl md:text-7xl font-extrabold drop-shadow-lg leading-tight">
          A Taste of Tradition, Served Fast.
        </h2>
        <p className="mt-4 mb-5 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
          Welcome to Apsara Cafe! Rohtak's favourite spot for authentic coffee and quick, delicious drive-through bites.
        </p>
        <Link to="menu"  className="mt-[8rem] bg-yellow-500 hover:bg-yellow-600 text-amber-900 font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-xl">
          Order Drive-Through Now
        </Link>
      </div>
    </div>
  );
};

export default Hero;