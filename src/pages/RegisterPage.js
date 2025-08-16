

// import React, { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import lo1 from "../assets/lo1.jpg"; // burger
// import lo2 from "../assets/lo2.jpg"; // pizza
// import lo3 from "../assets/lo3.jpg"; // hot coffee
// import lo4 from "../assets/lo4.jpg"; // sizzling brownie
// import lo5 from "../assets/lo5.jpg"; // cold coffee

// const RegisterPage = () => {
//   const imagesRef = useRef([]);
//   const textRef = useRef(null);

//   // Quotes array
//   const quotes = [
//     "🍔 Register Now, Grab a Burger Later!",
//     "🍕 Join Us & Share a Slice of Success",
//     "☕ A Hot Coffee Awaits Your Sign Up",
//     "🍫 Sweet Beginnings with Brownie Dreams",
//     "🥶 Cool People Register for Cold Coffee",
//   ];

//   const [quoteIndex, setQuoteIndex] = useState(0);

//   useEffect(() => {
//     // Faster infinite scrolling background
//     gsap.to(imagesRef.current, {
//       xPercent: -100 * (imagesRef.current.length - 1),
//       ease: "none",
//       duration: 15, // was 25 → now faster
//       repeat: -1,
//     });

//     // Rotating quotes
//     const tl = gsap.timeline({ repeat: -1 });
//     quotes.forEach(() => {
//       tl.to(textRef.current, {
//         opacity: 0,
//         duration: 0.6,
//         delay: 2.4,
//         onComplete: () => {
//           setQuoteIndex((prev) => (prev + 1) % quotes.length);
//         },
//       });
//       tl.to(textRef.current, { opacity: 1, duration: 0.6 });
//     });
//   }, []);

//   return (
//     <div className="relative w-full h-screen overflow-hidden">
//       {/* Background Scrolling Images */}
//       <div
//         className="absolute flex h-full w-[600%]"
//         ref={(el) => (imagesRef.current = el ? el.children : [])}
//       >
//         {[lo1, lo2, lo3, lo4, lo5, lo1].map((img, idx) => (
//           <img
//             key={idx}
//             src={img}
//             alt="food-bg"
//             className="h-full w-screen object-cover"
//           />
//         ))}
//       </div>

//       {/* Register Box (transparent, floating) */}
//       <div className="relative z-10 flex items-center justify-center h-full p-4">
//         <div className="p-4 md:p-8 rounded-xl max-w-sm md:max-w-md w-full text-center">
//           <h2
//             ref={textRef}
//             style={{
//               fontFamily: "'Press Start 2P', cursive", // pixel effect font
//               fontSize: "16px",
//               color: "#ff6600",
//               textShadow: "2px 2px 0 #000",
//               minHeight: "50px",
//             }}
//           >
//             {quotes[quoteIndex]}
//           </h2>

//           <form className="mt-6 space-y-3 md:space-y-4">
//             <input
//               type="text"
//               placeholder="Full Name"
//               className="w-full px-3 md:px-4 py-2 border rounded-md 
//                          focus:ring-2 focus:ring-orange-500 bg-white/70 
//                          placeholder-black"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full px-3 md:px-4 py-2 border rounded-md 
//                          focus:ring-2 focus:ring-orange-500 bg-white/70 
//                          placeholder-black"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full px-3 md:px-4 py-2 border rounded-md 
//                          focus:ring-2 focus:ring-orange-500 bg-white/70 
//                          placeholder-black"
//             />
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               className="w-full px-3 md:px-4 py-2 border rounded-md 
//                          focus:ring-2 focus:ring-orange-500 bg-white/70 
//                          placeholder-black"
//             />
//             <button
//               type="submit"
//               className="w-full bg-orange-600 text-white py-2 rounded-md font-bold hover:bg-orange-700 transition duration-300"
//             >
//               Register
//             </button>
//           </form>

//           <p className="mt-4 text-xs md:text-sm font-mono text-white drop-shadow-lg">
//             🍴 “Sign Up Today, Eat Well Tomorrow”
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;

// import React, { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import lo1 from "../assets/lo1.jpg"; // burger
// import lo2 from "../assets/lo2.jpg"; // pizza
// import lo3 from "../assets/lo3.jpg"; // hot coffee
// import lo4 from "../assets/lo4.jpg"; // sizzling brownie
// import lo5 from "../assets/lo5.jpg"; // cold coffee

// const RegisterPage = () => {
//   const imagesRef = useRef([]);
//   const textRef = useRef(null);
//   const boxRef = useRef(null);

//   // Quotes array
//   const quotes = [
//     "🍔 Register Now, Grab a Burger Later!",
//     "🍕 Join Us & Share a Slice of Success",
//     "☕ A Hot Coffee Awaits Your Sign Up",
//     "🍫 Sweet Beginnings with Brownie Dreams",
//     "🥶 Cool People Register for Cold Coffee",
//   ];

//   const [quoteIndex, setQuoteIndex] = useState(0);

//   useEffect(() => {
//     // Background smooth scroll
//     gsap.to(imagesRef.current, {
//       xPercent: -100 * (imagesRef.current.length - 1),
//       ease: "none",
//       duration: 15,
//       repeat: -1,
//     });

//     // Floating box animation
//     gsap.to(boxRef.current, {
//       y: -10,
//       duration: 2,
//       yoyo: true,
//       repeat: -1,
//       ease: "easeInOut",
//     });

//     // Rotating quotes
//     const tl = gsap.timeline({ repeat: -1 });
//     quotes.forEach(() => {
//       tl.to(textRef.current, {
//         opacity: 0,
//         duration: 0.5,
//         delay: 2,
//         onComplete: () => {
//           setQuoteIndex((prev) => (prev + 1) % quotes.length);
//         },
//       });
//       tl.to(textRef.current, {
//         opacity: 1,
//         duration: 0.6,
//         scale: 1.05,
//         ease: "bounce.out",
//       });
//       tl.to(textRef.current, { scale: 1, duration: 0.3 });
//     });
//   }, []);

//   return (
//     <div className="relative w-full h-screen overflow-hidden">
//       {/* Background Images */}
//       <div
//         className="absolute flex h-full w-[600%] opacity-0"
//         ref={(el) => {
//           if (el) {
//             imagesRef.current = el.children;
//             gsap.to(el, { opacity: 1, duration: 1.5, delay: 0.2 }); // fade in bg
//           }
//         }}
//       >
//         {[lo1, lo2, lo3, lo4, lo5, lo1].map((img, idx) => (
//           <img
//             key={idx}
//             src={img}
//             alt="food-bg"
//             className="h-full w-screen object-cover"
//           />
//         ))}
//       </div>

//       {/* Floating Register Box */}
//       <div className="relative z-10 flex items-center justify-center h-full p-4">
//         <div
//           ref={boxRef}
//           className="p-4 md:p-8 rounded-xl max-w-sm md:max-w-md w-full text-center bg-white/20 backdrop-blur-sm"
//         >
//           {/* Quote */}
//           <h2
//             ref={textRef}
//             style={{
//               fontFamily: "'Press Start 2P', cursive",
//               fontSize: "16px",
//               color: "#ff6600",
//               textShadow: "2px 2px 0 #000",
//               minHeight: "50px",
//             }}
//           >
//             {quotes[quoteIndex]}
//           </h2>

//           {/* Form */}
//           <form className="mt-6 space-y-3 md:space-y-4">
//             <input
//               type="text"
//               placeholder="Full Name"
//               className="w-full px-3 md:px-4 py-2 border rounded-md 
//                          bg-white/70 placeholder-black 
//                          focus:ring-2 focus:ring-orange-500 focus:scale-105 transition duration-200"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full px-3 md:px-4 py-2 border rounded-md 
//                          bg-white/70 placeholder-black 
//                          focus:ring-2 focus:ring-orange-500 focus:scale-105 transition duration-200"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full px-3 md:px-4 py-2 border rounded-md 
//                          bg-white/70 placeholder-black 
//                          focus:ring-2 focus:ring-orange-500 focus:scale-105 transition duration-200"
//             />
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               className="w-full px-3 md:px-4 py-2 border rounded-md 
//                          bg-white/70 placeholder-black 
//                          focus:ring-2 focus:ring-orange-500 focus:scale-105 transition duration-200"
//             />
//             <button
//               type="submit"
//               className="w-full bg-orange-600 text-white py-2 rounded-md font-bold 
//                          hover:bg-orange-700 transform hover:scale-105 
//                          transition duration-300"
//             >
//               Register
//             </button>
//           </form>

//           <p className="mt-4 text-xs md:text-sm font-mono text-white drop-shadow-lg">
//             🍴 “Sign Up Today, Eat Well Tomorrow”
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import API from '../api'; // Assumed API configuration
import lo1 from "../assets/lo1.jpg"; // burger
import lo2 from "../assets/lo2.jpg"; // pizza
import lo3 from "../assets/lo3.jpg"; // hot coffee
import lo4 from "../assets/lo4.jpg"; // sizzling brownie
import lo5 from "../assets/lo5.jpg"; // cold coffee

const RegisterPage = () => {
  const imagesRef = useRef([]);
  const textRef = useRef(null);
  const boxRef = useRef(null);

  // State to manage form data for all fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: ''
  });

  // Hook for navigation
  const navigate = useNavigate();

  // Quotes array
  const quotes = [
    "🍔 Register Now, Grab a Burger Later!",
    "🍕 Join Us & Share a Slice of Success",
    "☕ A Hot Coffee Awaits Your Sign Up",
    "🍫 Sweet Beginnings with Brownie Dreams",
    "🥶 Cool People Register for Cold Coffee",
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission and API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to the register endpoint
      const response = await API.post('/auth/register', formData);
      toast.success('Registration successful! Welcome!');
      // Store user info in localStorage
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      // Redirect to the menu page after successful registration
      navigate('/menu');
    } catch (error) {
      // Show an error toast if registration fails
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  useEffect(() => {
    // Background smooth scroll
    gsap.to(imagesRef.current, {
      xPercent: -100 * (imagesRef.current.length - 1),
      ease: "none",
      duration: 15,
      repeat: -1,
    });

    // Floating box animation
    gsap.to(boxRef.current, {
      y: -10,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "easeInOut",
    });

    // Rotating quotes
    const tl = gsap.timeline({ repeat: -1 });
    quotes.forEach(() => {
      tl.to(textRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 2,
        onComplete: () => {
          setQuoteIndex((prev) => (prev + 1) % quotes.length);
        },
      });
      tl.to(textRef.current, {
        opacity: 1,
        duration: 0.6,
        scale: 1.05,
        ease: "bounce.out",
      });
      tl.to(textRef.current, { scale: 1, duration: 0.3 });
    });
  }, [quotes.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Images */}
      <div
        className="absolute flex h-full w-[600%] opacity-0"
        ref={(el) => {
          if (el) {
            imagesRef.current = el.children;
            // Fade in the background images for a smooth start
            gsap.to(el, { opacity: 1, duration: 1.5, delay: 0.2 });
          }
        }}
      >
        {[lo1, lo2, lo3, lo4, lo5, lo1].map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt="food-bg"
            className="h-full w-screen object-cover"
          />
        ))}
      </div>

      {/* Floating Register Box */}
      <div className="relative z-10 flex items-center justify-center h-full p-4">
        <div
          ref={boxRef}
          className="p-4 md:p-8 rounded-xl max-w-sm md:max-w-md w-full text-center 
                     bg-white/20 backdrop-blur-sm shadow-xl"
        >
          {/* Quote */}
          <h2
            ref={textRef}
            style={{
              fontFamily: "'Press Start 2P', cursive",
              fontSize: "16px",
              color: "#ff6600",
              textShadow: "2px 2px 0 #000",
              minHeight: "50px",
            }}
          >
            {quotes[quoteIndex]}
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-3 md:space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 md:px-4 py-2 border rounded-md 
                         bg-white/70 placeholder-black
                         focus:ring-2 focus:ring-orange-500 focus:scale-105 transition duration-200"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 md:px-4 py-2 border rounded-md 
                         bg-white/70 placeholder-black
                         focus:ring-2 focus:ring-orange-500 focus:scale-105 transition duration-200"
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full px-3 md:px-4 py-2 border rounded-md 
                         bg-white/70 placeholder-black
                         focus:ring-2 focus:ring-orange-500 focus:scale-105 transition duration-200"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 md:px-4 py-2 border rounded-md 
                         bg-white/70 placeholder-black
                         focus:ring-2 focus:ring-orange-500 focus:scale-105 transition duration-200"
            />
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded-md font-bold 
                         hover:bg-orange-700 transform hover:scale-105 
                         transition duration-300"
            >
              Sign Up
            </button>
          </form>

          {/* Footer Tagline */}
          <p className="mt-4 text-xs md:text-sm font-mono text-white drop-shadow-lg">
            🍴 “Sign Up Today, Eat Well Tomorrow”
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
