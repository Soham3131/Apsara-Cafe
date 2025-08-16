


// import React, { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import lo1 from "../assets/lo1.jpg"; // burger
// import lo2 from "../assets/lo2.jpg"; // pizza
// import lo3 from "../assets/lo3.jpg"; // hot coffee
// import lo4 from "../assets/lo4.jpg"; // sizzling brownie
// import lo5 from "../assets/lo5.jpg"; // cold coffee

// // NOTE: Tailwind CSS is used here for styling. The `tailwind-placeholder-black` class is a custom name used for demonstration purposes.
// // In a real project, the `placeholder-black` class from your register page would be sufficient.

// const LoginPage = () => {
//   const imagesRef = useRef([]);
//   const textRef = useRef(null);
//   const boxRef = useRef(null); // Ref for the login box to enable the floating animation

//   // Quotes array
//   const quotes = [
//     "🍔 Have a Burger, Start Your Journey",
//     "🍕 Slice into Success with Pizza",
//     "☕ Fuel Your Day with a Hot Coffee",
//     "🍫 Sizzle with a Brownie Break",
//     "🥶 Chill with a Cold Coffee Vibe",
//   ];

//   const [quoteIndex, setQuoteIndex] = useState(0);

//   useEffect(() => {
//     // Background smooth scroll animation
//     gsap.to(imagesRef.current, {
//       xPercent: -100 * (imagesRef.current.length - 1),
//       ease: "none",
//       duration: 15,
//       repeat: -1,
//     });

//     // Floating box animation, copied from the RegisterPage
//     gsap.to(boxRef.current, {
//       y: -10,
//       duration: 2,
//       yoyo: true,
//       repeat: -1,
//       ease: "easeInOut",
//     });

//     // Quote changing with fade and bounce effect, copied from the RegisterPage
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
//   }, [quotes.length]);

//   return (
//     <div className="relative w-full h-screen overflow-hidden">
//       {/* Background Scrolling Images */}
//       <div
//         className="absolute flex h-full w-[600%] opacity-0"
//         ref={(el) => {
//           if (el) {
//             imagesRef.current = el.children;
//             // Fade in the background images for a smooth start
//             gsap.to(el, { opacity: 1, duration: 1.5, delay: 0.2 });
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

//       {/* Login Box with updated styling and floating animation */}
//       <div className="relative z-10 flex items-center justify-center h-full p-4">
//         <div 
//           ref={boxRef}
//           className="p-4 md:p-8 rounded-xl max-w-sm md:max-w-md w-full text-center 
//                      bg-white/20 backdrop-blur-sm shadow-xl"
//         >
//           {/* Quotes Title */}
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

//           {/* Login Form */}
//           <form className="mt-6 space-y-3 md:space-y-4">
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
//             <button
//               type="submit"
//               className="w-full bg-orange-600 text-white py-2 rounded-md font-bold 
//                          hover:bg-orange-700 transform hover:scale-105 
//                          transition duration-300"
//             >
//               Login
//             </button>
//           </form>

//           {/* Footer Tagline */}
//           <p className="mt-4 text-xs md:text-sm font-mono text-white drop-shadow-lg">
//             🍴 “Good Food = Good Mood”
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import lo1 from "../assets/lo1.jpg"; // burger
import lo2 from "../assets/lo2.jpg"; // pizza
import lo3 from "../assets/lo3.jpg"; // hot coffee
import lo4 from "../assets/lo4.jpg"; // sizzling brownie
import lo5 from "../assets/lo5.jpg"; // cold coffee

// Imports for the new functionality
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import API from '../api'; // This is an assumed import for your API configuration

const LoginPage = () => {
  const imagesRef = useRef([]);
  const textRef = useRef(null);
  const boxRef = useRef(null); // Ref for the login box to enable the floating animation

  // State to manage form data
  const [formData, setFormData] = useState({ email: '', password: '' });

  // Hook for navigation
  const navigate = useNavigate();

  // Quotes array
  const quotes = [
    "🍔 Have a Burger, Start Your Journey",
    "🍕 Slice into Success with Pizza",
    "☕ Fuel Your Day with a Hot Coffee",
    "🍫 Sizzle with a Brownie Break",
    "🥶 Chill with a Cold Coffee Vibe",
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
      // API call to the login endpoint
      const response = await API.post('/auth/login', formData);
      toast.success('Logged in successfully!');
      // Store user info in localStorage
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      // Redirect to the menu page
      navigate('/menu');
    } catch (error) {
      // Show an error toast if login fails
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  useEffect(() => {
    // Background smooth scroll animation
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

    // Quote changing with fade and bounce effect
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
      {/* Background Scrolling Images */}
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

      {/* Login Box with updated styling and floating animation */}
      <div className="relative z-10 flex items-center justify-center h-full p-4">
        <div 
          ref={boxRef}
          className="p-4 md:p-8 rounded-xl max-w-sm md:max-w-md w-full text-center 
                     bg-white/20 backdrop-blur-sm shadow-xl"
        >
          {/* Quotes Title */}
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

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-3 md:space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
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
              Login
            </button>
          </form>

          {/* Footer Tagline */}
          <p className="mt-4 text-xs md:text-sm font-mono text-white drop-shadow-lg">
            🍴 “Good Food = Good Mood”
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
