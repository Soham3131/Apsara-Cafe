
// import React, { useState, useEffect } from 'react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { useCart } from '../context/CartContext';

// // A simple, clean SVG icon for the logo
// const CafeIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m0 14v1m-6.364-6.364l-.707.707M19.071 19.071l-.707-.707M4 12H3m18 0h-1m-5.636-7.636l-.707-.707M6.343 6.343l-.707-.707m12.728 0l.707.707M6.343 17.728l.707.707" />
//         <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//     </svg>
// );

// const Navbar = () => {
//     const navigate = useNavigate();
//     const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//     const { cartCount } = useCart();
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//     // Effect to prevent scrolling when the mobile menu is open
//     useEffect(() => {
//         if (isMobileMenuOpen) {
//             document.body.style.overflow = 'hidden';
//         } else {
//             document.body.style.overflow = 'auto';
//         }
//         // Cleanup function to restore scroll on component unmount
//         return () => {
//             document.body.style.overflow = 'auto';
//         };
//     }, [isMobileMenuOpen]);

//     const handleLogout = () => {
//         localStorage.removeItem('userInfo');
//         toast.success('Logged out successfully!');
//         setIsMobileMenuOpen(false);
//         navigate('/login');
//     };

//     const closeMobileMenu = () => setIsMobileMenuOpen(false);

//     // --- Style Definitions for Links ---
//     const desktopLinkStyle = "relative text-gray-700 font-semibold after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-amber-800 after:transition-all after:duration-300 hover:after:w-full";
//     const desktopActiveLinkStyle = "relative text-amber-800 font-bold after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-amber-800";
    
//     const mobileLinkStyle = "text-gray-700 font-semibold py-3 px-4 rounded-lg w-full text-center transition-colors hover:bg-amber-200 text-lg";
//     const mobileActiveLinkStyle = "bg-amber-300 text-amber-900 font-semibold py-3 px-4 rounded-lg w-full text-center text-lg";

//     // Reusable component for the navigation links
//     const NavLinks = ({ isMobile = false }) => (
//         <div className={`flex items-center gap-8 ${isMobile ? 'flex-col' : 'flex-row'}`}>
//             <NavLink to="/" className={({ isActive }) => isActive ? (isMobile ? mobileActiveLinkStyle : desktopActiveLinkStyle) : (isMobile ? mobileLinkStyle : desktopLinkStyle)} onClick={closeMobileMenu}>Home</NavLink>
//             {userInfo && userInfo.isAdmin ? (
//                 <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? (isMobile ? mobileActiveLinkStyle : desktopActiveLinkStyle) : (isMobile ? mobileLinkStyle : desktopLinkStyle)} onClick={closeMobileMenu}>Dashboard</NavLink>
//             ) : (
//                 <>
//                     <NavLink to="/menu" className={({ isActive }) => isActive ? (isMobile ? mobileActiveLinkStyle : desktopActiveLinkStyle) : (isMobile ? mobileLinkStyle : desktopLinkStyle)} onClick={closeMobileMenu}>Menu</NavLink>
//                     {userInfo && <NavLink to="/my-orders" className={({ isActive }) => isActive ? (isMobile ? mobileActiveLinkStyle : desktopActiveLinkStyle) : (isMobile ? mobileLinkStyle : desktopLinkStyle)} onClick={closeMobileMenu}>My Orders</NavLink>}
//                 </>
//             )}
//         </div>
//     );

//     // Reusable component for the authentication buttons and cart icon
//     const AuthButtonsAndCart = ({ isMobile = false }) => (
//         <div className={`flex items-center gap-4 ${isMobile ? 'flex-col w-full' : 'flex-row'}`}>
//             {userInfo ? (
//                 <>
//                     {isMobile && <span className="font-semibold text-gray-700 text-lg">Hi, {userInfo.name.split(' ')[0]}</span>}
//                     <button onClick={handleLogout} className="bg-amber-800 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 w-full md:w-auto">
//                         Log Out
//                     </button>
//                 </>
//             ) : (
//                 <>
//                     <Link to="/login" onClick={closeMobileMenu} className="text-amber-900 font-semibold px-5 py-2 rounded-full transition-colors hover:bg-amber-200 w-full md:w-auto text-center text-lg">
//                         Log In
//                     </Link>
//                     <Link to="/register" onClick={closeMobileMenu} className="bg-amber-800 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 w-full md:w-auto text-center text-lg">
//                         Sign Up
//                     </Link>
//                 </>
//             )}
//             {userInfo && !userInfo.isAdmin && (
//                 <Link to="/cart" onClick={closeMobileMenu} className="relative p-2 transition-transform hover:scale-110">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                     </svg>
//                     {cartCount > 0 && (
//                         <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
//                             {cartCount}
//                         </span>
//                     )}
//                 </Link>
//             )}
//         </div>
//     );

//     return (
//         <>
//             <nav className="bg-stone-100/80 backdrop-blur-md shadow-md fixed w-full top-0 z-30">
//                 <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
//                     <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-2 text-2xl font-bold text-amber-900 transition-transform hover:scale-105 z-50">
//                         <CafeIcon />
//                         Apsara Cafe
//                     </Link>

//                     <div className="hidden md:flex items-center gap-8">
//                         <NavLinks />
//                         <AuthButtonsAndCart />
//                     </div>

//                     <div className="md:hidden">
//                         <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-amber-900 focus:outline-none z-50">
//                             <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
//                             </svg>
//                         </button>
//                     </div>
//                 </div>
//             </nav>

//             <div 
//                 className={`fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden transition-opacity duration-300 z-20 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
//                 onClick={closeMobileMenu}
//             ></div>

//             <div className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-stone-100 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden z-30 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//                 <div className="p-8 pt-24 space-y-8">
//                     <NavLinks isMobile={true} />
//                     <div className="border-t border-gray-300 pt-8">
//                         <AuthButtonsAndCart isMobile={true} />
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Navbar;
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png'; // 1. IMPORT your logo image

const Navbar = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const { cartCount } = useCart();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Effect to prevent scrolling when the mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMobileMenuOpen]);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        toast.success('Logged out successfully!');
        setIsMobileMenuOpen(false);
        navigate('/login');
    };

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    // --- Style Definitions for Links ---
    const desktopLinkStyle = "relative text-gray-700 font-semibold after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-amber-800 after:transition-all after:duration-300 hover:after:w-full";
    const desktopActiveLinkStyle = "relative text-amber-800 font-bold after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-amber-800";
    
    const mobileLinkStyle = "text-gray-700 font-semibold py-3 px-4 rounded-lg w-full text-center transition-colors hover:bg-amber-200 text-lg";
    const mobileActiveLinkStyle = "bg-amber-300 text-amber-900 font-semibold py-3 px-4 rounded-lg w-full text-center text-lg";

    // Reusable component for the navigation links
    const NavLinks = ({ isMobile = false }) => (
        <div className={`flex items-center gap-8 ${isMobile ? 'flex-col' : 'flex-row'}`}>
            <NavLink to="/" className={({ isActive }) => isActive ? (isMobile ? mobileActiveLinkStyle : desktopActiveLinkStyle) : (isMobile ? mobileLinkStyle : desktopLinkStyle)} onClick={closeMobileMenu}>Home</NavLink>
            {userInfo && userInfo.isAdmin ? (
                <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? (isMobile ? mobileActiveLinkStyle : desktopActiveLinkStyle) : (isMobile ? mobileLinkStyle : desktopLinkStyle)} onClick={closeMobileMenu}>Dashboard</NavLink>
            ) : (
                <>
                    <NavLink to="/menu" className={({ isActive }) => isActive ? (isMobile ? mobileActiveLinkStyle : desktopActiveLinkStyle) : (isMobile ? mobileLinkStyle : desktopLinkStyle)} onClick={closeMobileMenu}>Menu</NavLink>
                    {userInfo && <NavLink to="/my-orders" className={({ isActive }) => isActive ? (isMobile ? mobileActiveLinkStyle : desktopActiveLinkStyle) : (isMobile ? mobileLinkStyle : desktopLinkStyle)} onClick={closeMobileMenu}>My Orders</NavLink>}
                </>
            )}
        </div>
    );

    // Reusable component for the authentication buttons and cart icon
    const AuthButtonsAndCart = ({ isMobile = false }) => (
        <div className={`flex items-center gap-4 ${isMobile ? 'flex-col w-full' : 'flex-row'}`}>
            {userInfo ? (
                <>
                    {isMobile && <span className="font-semibold text-gray-700 text-lg">Hi, {userInfo.name.split(' ')[0]}</span>}
                    <button onClick={handleLogout} className="bg-amber-800 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 w-full md:w-auto">
                        Log Out
                    </button>
                </>
            ) : (
                <>
                    <Link to="/login" onClick={closeMobileMenu} className="text-amber-900 font-semibold px-5 py-2 rounded-full transition-colors hover:bg-amber-200 w-full md:w-auto text-center text-lg">
                        Log In
                    </Link>
                    <Link to="/register" onClick={closeMobileMenu} className="bg-amber-800 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 w-full md:w-auto text-center text-lg">
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
        </div>
    );

    return (
        <>
            <nav className="bg-stone-100/80 backdrop-blur-md shadow-md fixed w-full top-0 z-30">
                <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
                    {/* 2. REPLACE the SVG with an <img> tag */}
                    <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-2 transition-transform hover:scale-105 z-50">
                        <img src={logo} alt="Apsara Cafe Logo" className="h-[5rem] w-auto" />
                        {/* <span className="text-2xl font-bold text-amber-900 hidden sm:block">Apsara Cafe</span> */}
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <NavLinks />
                        <AuthButtonsAndCart />
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-amber-900 focus:outline-none z-50">
                            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            <div 
                className={`fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden transition-opacity duration-300 z-20 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={closeMobileMenu}
            ></div>

            <div className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-stone-100 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden z-30 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-8 pt-24 space-y-8">
                    <NavLinks isMobile={true} />
                    <div className="border-t border-gray-300 pt-8">
                        <AuthButtonsAndCart isMobile={true} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;