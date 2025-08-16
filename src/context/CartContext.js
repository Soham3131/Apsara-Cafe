// src/context/CartContext.js
import React, { createContext, useState, useContext } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems(prevItems => {
            const exist = prevItems.find(x => x._id === item._id);
            if (exist) {
                toast.success(`${item.name} quantity updated in cart`);
                return prevItems.map(x => 
                    x._id === item._id ? { ...x, qty: x.qty + 1 } : x
                );
            } else {
                toast.success(`${item.name} added to cart`);
                return [...prevItems, { ...item, qty: 1 }];
            }
        });
    };
    
    const removeFromCart = (item) => {
         setCartItems(prevItems => prevItems.filter(x => x._id !== item._id));
         toast.error(`${item.name} removed from cart`);
    };

    const clearCart = () => {
        setCartItems([]);
    }

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount: cartItems.reduce((acc, item) => acc + item.qty, 0),
        totalPrice: cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};