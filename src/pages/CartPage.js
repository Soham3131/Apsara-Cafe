
import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import API from "../api"

const CartPage = () => {
    const { cartItems, removeFromCart, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
     const [note, setNote] = useState('');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // This function loads the Razorpay script
    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleCheckout = async () => {
        if (!userInfo) {
            toast.error('Please log in to proceed to checkout.');
            navigate('/login');
            return;
        }

        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!res) {
            toast.error('Razorpay SDK failed to load. Are you online?');
            return;
        }

        try {
            // 1. Create a Razorpay Order from our backend
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data: order } = await API.post('/api/orders/create-razorpay-order', { amount: totalPrice * 100 }, config);

            // 2. Configure Razorpay options
            const options = {
                key: "rzp_test_wP9SAvAW48CSjE" , // Enter the Key ID generated from the Dashboard
                amount: order.amount,
                currency: order.currency,
                name: "Apsara Cafe",
                description: "Drive-Through Order",
                order_id: order.id,
                handler: async function (response) {
                    // 3. This function is called after payment is successful
                    const paymentDetails = {
                        paymentId: response.razorpay_payment_id,
                        status: 'Paid'
                    };
                    const orderPayload = {
                        orderItems: cartItems.map(item => ({ menuItem: item._id, quantity: item.qty, price: item.price })),
                        totalAmount: totalPrice,
                        paymentDetails,
                        customerNote: note,
                    };

                    // 4. Save the final order to our database
                    await API.post('/api/orders', orderPayload, config);
                    
                    toast.success('Order placed successfully!');
                    clearCart();
                    navigate('/my-orders');
                },
                prefill: {
                    name: userInfo.name,
                    email: userInfo.email,
                },
                theme: {
                    color: '#8A2BE2',
                },
            };

            // === ADD THIS DEBUG BLOCK ===
            console.log("--- FINAL CHECK ---");
            console.log("Key ID being sent to Razorpay:", options.key);
            console.log("-------------------");
            // ==========================

            // 5. Open the Razorpay payment modal
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            toast.error('Checkout failed. Please try again.');
        }
    };


    return (
        <div className="pt-24 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6 py-8">
                <h1 className="text-4xl font-extrabold text-center text-amber-900 mb-8">Your Cart</h1>
                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-600">Your cart is empty.</p>
                ) : (
                    <div className="md:grid md:grid-cols-3 md:gap-8">
                        <div className="md:col-span-2">
                            {cartItems.map(item => (
                                <div key={item._id} className="flex items-center justify-between bg-white p-4 mb-4 rounded-lg shadow">
                                    <div className="flex items-center">
                                        <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded mr-4"/>
                                        <div>
                                            <p className="font-bold">{item.name}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">₹{(item.qty * item.price).toFixed(2)}</p>
                                        <button onClick={() => removeFromCart(item)} className="text-red-500 text-sm hover:underline">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="md:col-span-1">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>₹{totalPrice.toFixed(2)}</span>
                                </div>
                                <hr className="my-2"/>
                                <div className="flex justify-between font-bold text-lg mb-4">
                                    <span>Total</span>
                                    <span>₹{totalPrice.toFixed(2)}</span>
                                </div>
                                 <div className="mt-4">
                    <label htmlFor="customerNote" className="block text-sm font-medium text-gray-700">Order Notes (Optional)</label>
                    <textarea
                        id="customerNote"
                        name="customerNote"
                        rows="3"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                        placeholder="e.g., Please make it extra spicy."
                    ></textarea>
                </div>
                                <button onClick={handleCheckout} className="w-full bg-amber-800 text-white py-3 rounded-md hover:bg-amber-900 transition duration-300">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;