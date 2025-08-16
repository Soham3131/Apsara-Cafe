
// import React, { useState, useEffect } from 'react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { useCart } from '../context/CartContext';

// // A simple SVG icon for the logo
// const CoffeeCupIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m0 14v1m-6.364-6.364l-.707.707M19.071 19.071l-.707-.707M4 12H3m18 0h-1m-5.636-7.636l-.707-.707M6.343 6.343l-.707-.707m12.728 0l.707.707M6.343 17.728l.707.707" />
//         <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//     </svg>
// );


// const Navbar = () => {
//     const navigate = useNavigate();
//     const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//     const { cartCount } = useCart();
//     const [visible, setVisible] = useState(false);

//     // This effect triggers the entry animation
//     useEffect(() => {
//         setVisible(true);
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem('userInfo');
//         toast.success('Logged out successfully!');
//         navigate('/login');
//     };

//     // Style definitions for NavLink to highlight the active page
//     const linkStyle = "relative text-gray-600 font-semibold after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-amber-800 after:transition-all after:duration-300 hover:after:w-full";
//     const activeLinkStyle = `${linkStyle} text-amber-800 after:w-full`;

//     return (
//         <nav className={`bg-white bg-opacity-80 backdrop-blur-md shadow-md fixed w-full top-0 z-50 transition-transform duration-500 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
//             <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                
//                 {/* Logo with Icon */}
//                 <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-amber-900 transition-transform hover:scale-105">
//                     <CoffeeCupIcon />
//                     Apsara Cafe
//                 </Link>
                
//                 {/* --- Navigation Links --- */}
//                 <div className="hidden md:flex items-center space-x-8">
//                     <NavLink to="/" className={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>Home</NavLink>
                    
//                     {/* CONDITIONAL LINKS: Show different links for users and admins */}
//                     {userInfo && userInfo.isAdmin ? (
//                         // Admin Links
//                         <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>Dashboard</NavLink>
//                     ) : (
//                         // Regular User Links
//                         <>
//                             <NavLink to="/menu" className={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>Menu</NavLink>
//                             {userInfo && <NavLink to="/my-orders" className={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>My Orders</NavLink>}
//                         </>
//                     )}
//                 </div>

//                 {/* --- Auth Buttons & Cart --- */}
//                 <div className="flex items-center space-x-4">
//                     {userInfo ? (
//                         // If user is logged in
//                         <>
//                             <span className="font-semibold text-gray-700 hidden sm:block">Hi, {userInfo.name.split(' ')[0]}</span>
//                             <button onClick={handleLogout} className="bg-amber-800 text-white px-4 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
//                                 Log Out
//                             </button>
//                         </>
//                     ) : (
//                         // If user is logged out
//                         <>
//                             <Link to="/login" className="hidden md:block text-amber-900 font-semibold px-4 py-2 rounded-full transition-colors hover:bg-amber-100">Log In</Link>
//                             <Link to="/register" className="bg-amber-800 text-white px-4 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
//                                 Sign Up
//                             </Link>
//                         </>
//                     )}

//                     {/* Show Cart Icon ONLY for regular users */}
//                     {userInfo && !userInfo.isAdmin && (
//                         <Link to="/cart" className="relative p-2 transition-transform hover:scale-110">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                             </svg>
//                             {cartCount > 0 && (
//                                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
//                                     {cartCount}
//                                 </span>
//                             )}
//                         </Link>
//                     )}
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';

// SVG Icon for Logo
const CafeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M18 8a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-1m-1 6h-2" />
    <line x1="8" y1="2" x2="8" y2="4" />
    <line x1="16" y1="2" x2="16" y2="4" />
  </svg>
);

const Navbar = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const { cartCount } = useCart();
  const [visible, setVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => setVisible(true), []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Updated link styles with background
  const linkStyle = "relative text-black  font-semibold px-4 py-2 rounded-md hover:bg-amber-200 transition-colors w-full text-center";
  const activeLinkStyle = "relative text-amber-900 font-semibold px-4 py-2 rounded-md bg-amber-300 w-full text-center";

  const navLinks = (
    <>
      <NavLink to="/" className={({ isActive }) => isActive ? activeLinkStyle : linkStyle} onClick={closeMobileMenu}>Home</NavLink>
      {userInfo && userInfo.isAdmin ? (
        <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? activeLinkStyle : linkStyle} onClick={closeMobileMenu}>Dashboard</NavLink>
      ) : (
        <>
          <NavLink to="/menu" className={({ isActive }) => isActive ? activeLinkStyle : linkStyle} onClick={closeMobileMenu}>Menu</NavLink>
          {userInfo && <NavLink to="/my-orders" className={({ isActive }) => isActive ? activeLinkStyle : linkStyle} onClick={closeMobileMenu}>My Orders</NavLink>}
        </>
      )}
    </>
  );

  const authButtonsAndCart = (
    <>
      {userInfo ? (
        <>
          <span className="font-semibold text-gray-700 hidden sm:block">Hi, {userInfo.name.split(' ')[0]}</span>
          <button onClick={handleLogout} className="bg-amber-800 text-white px-4 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
            Log Out
          </button>
        </>
      ) : (
        <>
          <Link to="/login" onClick={closeMobileMenu} className="hidden md:block bg-amber-200 text-amber-900 font-semibold px-4 py-2 rounded-full shadow-md hover:bg-amber-300 transition-colors">
            Log In
          </Link>
          <Link to="/register" onClick={closeMobileMenu} className="bg-amber-800 text-white px-4 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
            Sign Up
          </Link>
        </>
      )}

      {userInfo && !userInfo.isAdmin && (
        <Link to="/cart" onClick={closeMobileMenu} className="relative p-2 transition-transform hover:scale-110">
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
    </>
  );

  return (
    <nav className={`bg-amber-100 bg-opacity-90 backdrop-blur-md shadow-md fixed w-full top-0 z-50 transition-transform duration-500 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-amber-900 transition-transform hover:scale-105">
          <CafeIcon />
          Apsara Cafe
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-4">
          {navLinks}
        </div>

        {/* Auth Buttons & Cart Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {authButtonsAndCart}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center space-x-2">
          {userInfo && !userInfo.isAdmin && (
            <Link to="/cart" onClick={closeMobileMenu} className="relative p-2 transition-transform hover:scale-110">
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
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-amber-900 focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-amber-100 shadow-lg transform transition-transform duration-300 md:hidden z-40 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col items-start p-6 space-y-4 pt-20">
          {navLinks}
          <div className="w-full flex flex-col space-y-4">
            {authButtonsAndCart}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
