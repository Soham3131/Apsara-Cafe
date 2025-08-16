// // src/context/CartContext.js
// import React, { createContext, useState, useContext } from 'react';
// import toast from 'react-hot-toast';

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//     const [cartItems, setCartItems] = useState([]);

//     const addToCart = (item) => {
//         setCartItems(prevItems => {
//             const exist = prevItems.find(x => x._id === item._id);
//             if (exist) {
//                 toast.success(`${item.name} quantity updated in cart`);
//                 return prevItems.map(x => 
//                     x._id === item._id ? { ...x, qty: x.qty + 1 } : x
//                 );
//             } else {
//                 toast.success(`${item.name} added to cart`);
//                 return [...prevItems, { ...item, qty: 1 }];
//             }
//         });
//     };
    
//     const removeFromCart = (item) => {
//          setCartItems(prevItems => prevItems.filter(x => x._id !== item._id));
//          toast.error(`${item.name} removed from cart`);
//     };

//     const clearCart = () => {
//         setCartItems([]);
//     }

//     const value = {
//         cartItems,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         cartCount: cartItems.reduce((acc, item) => acc + item.qty, 0),
//         totalPrice: cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
//     };

//     return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };
import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// Load initial cart state from localStorage
const initialState = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(initialState);

    // useEffect to save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems(prevItems => {
            const exist = prevItems.find(x => x.cartId === item.cartId);
            if (exist) {
                toast.success(`${item.name} quantity updated`);
                return prevItems.map(x =>
                    x.cartId === item.cartId ? { ...x, qty: x.qty + 1 } : x
                );
            } else {
                toast.success(`${item.name} added to cart`);
                return [...prevItems, { ...item, qty: 1 }];
            }
        });
    };

    const updateQuantity = (item, newQty) => {
        const quantity = Number(newQty);
        if (quantity < 1) {
            removeFromCart(item, { showToast: false }); // Remove without showing a second toast
        } else {
            setCartItems(prevItems =>
                prevItems.map(x =>
                    x.cartId === item.cartId ? { ...x, qty: quantity } : x
                )
            );
        }
    };

    const removeFromCart = (item, options = { showToast: true }) => {
        setCartItems(prevItems => prevItems.filter(x => x.cartId !== item.cartId));
        if (options.showToast) {
            toast.error(`${item.name} removed from cart`);
        }
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems'); // Also clear from storage
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount: cartItems.reduce((acc, item) => acc + item.qty, 0),
        totalPrice: cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};