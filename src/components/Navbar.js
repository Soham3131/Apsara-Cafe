// // src/components/Navbar.js
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // IMPORT Link and useNavigate
// import toast from 'react-hot-toast';
// import { useCart } from '../context/CartContext';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//    const { cartCount } = useCart(); 

//   const handleLogout = () => {
//     localStorage.removeItem('userInfo');
//     toast.success('Logged out');
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-white bg-opacity-80 backdrop-blur-md shadow-md fixed w-full top-0 z-10">
//       <div className="container mx-auto px-6 py-3 flex justify-between items-center">
//         {/* CORRECTED: Link to homepage */}
//         <Link to="/" className="text-2xl font-bold text-amber-900">Apsara Cafe</Link>
        
//         <div className="hidden md:flex items-center space-x-6">
//           {/* CORRECTED: Use Link for navigation */}
//           <Link to="/" className="text-gray-700 hover:text-amber-900">Home</Link>
//           <Link to="/menu" className="text-gray-700 hover:text-amber-900">Menu</Link>
          
//           {/* Show links based on login status */}
//           {userInfo && <Link to="/my-orders" className="text-gray-700 hover:text-amber-900">My Orders</Link>}
//           {userInfo && userInfo.isAdmin && <Link to="/admin/dashboard" className="text-amber-900 font-bold hover:underline">Admin</Link>}

//            <Link to="/cart" className="relative">
//                     <span className="text-2xl">🛒</span>
//                     {cartCount > 0 && (
//                         <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                             {cartCount}
//                         </span>
//                     )}
//                 </Link>
//         </div>

//         <div className="flex items-center space-x-3">
//           {userInfo ? (
//             // If user is logged in, show their name and a logout button
//             <>
//               <span className="font-semibold text-gray-700">Hi, {userInfo.name.split(' ')[0]}</span>
//               <button onClick={handleLogout} className="bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-900 transition duration-300">
//                 Log Out
//               </button>
//             </>
//           ) : (
//             // If user is not logged in, show Login and Sign Up buttons
//             <>
//               {/* CORRECTED: Use Link for navigation */}
//               <Link to="/login" className="hidden md:block bg-transparent text-amber-900 px-4 py-2 rounded-md">Log In</Link>
//               <Link to="/register" className="bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-900 transition duration-300">
//                 Sign Up
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';

// A simple SVG icon for the logo
const CoffeeCupIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m0 14v1m-6.364-6.364l-.707.707M19.071 19.071l-.707-.707M4 12H3m18 0h-1m-5.636-7.636l-.707-.707M6.343 6.343l-.707-.707m12.728 0l.707.707M6.343 17.728l.707.707" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const Navbar = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const { cartCount } = useCart();
    const [visible, setVisible] = useState(false);

    // This effect triggers the entry animation
    useEffect(() => {
        setVisible(true);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        toast.success('Logged out successfully!');
        navigate('/login');
    };

    // Style definitions for NavLink to highlight the active page
    const linkStyle = "relative text-gray-600 font-semibold after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-amber-800 after:transition-all after:duration-300 hover:after:w-full";
    const activeLinkStyle = `${linkStyle} text-amber-800 after:w-full`;

    return (
        <nav className={`bg-white bg-opacity-80 backdrop-blur-md shadow-md fixed w-full top-0 z-50 transition-transform duration-500 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                
                {/* Logo with Icon */}
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-amber-900 transition-transform hover:scale-105">
                    <CoffeeCupIcon />
                    Apsara Cafe
                </Link>
                
                {/* --- Navigation Links --- */}
                <div className="hidden md:flex items-center space-x-8">
                    <NavLink to="/" className={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>Home</NavLink>
                    
                    {/* CONDITIONAL LINKS: Show different links for users and admins */}
                    {userInfo && userInfo.isAdmin ? (
                        // Admin Links
                        <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>Dashboard</NavLink>
                    ) : (
                        // Regular User Links
                        <>
                            <NavLink to="/menu" className={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>Menu</NavLink>
                            {userInfo && <NavLink to="/my-orders" className={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>My Orders</NavLink>}
                        </>
                    )}
                </div>

                {/* --- Auth Buttons & Cart --- */}
                <div className="flex items-center space-x-4">
                    {userInfo ? (
                        // If user is logged in
                        <>
                            <span className="font-semibold text-gray-700 hidden sm:block">Hi, {userInfo.name.split(' ')[0]}</span>
                            <button onClick={handleLogout} className="bg-amber-800 text-white px-4 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
                                Log Out
                            </button>
                        </>
                    ) : (
                        // If user is logged out
                        <>
                            <Link to="/login" className="hidden md:block text-amber-900 font-semibold px-4 py-2 rounded-full transition-colors hover:bg-amber-100">Log In</Link>
                            <Link to="/register" className="bg-amber-800 text-white px-4 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
                                Sign Up
                            </Link>
                        </>
                    )}

                    {/* Show Cart Icon ONLY for regular users */}
                    {userInfo && !userInfo.isAdmin && (
                        <Link to="/cart" className="relative p-2 transition-transform hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;