// src/pages/MyOrdersPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Get user info and token from localStorage
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (!userInfo || !userInfo.token) {
                    toast.error("Please log in to see your orders.");
                    setLoading(false);
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                
                setLoading(true);
                const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
                setOrders(data);
                setLoading(false);
            } catch (error) {
                toast.error('Could not fetch orders.');
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="pt-24 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6 py-8">
                <h1 className="text-4xl font-extrabold text-center text-amber-900 mb-8">My Order History</h1>
                {loading ? (
                    <p className="text-center">Loading your orders...</p>
                ) : orders.length === 0 ? (
                    <p className="text-center text-gray-600">You haven't placed any orders yet.</p>
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <div key={order._id} className="bg-white p-4 rounded-lg shadow">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-bold">Order ID: {order._id.substring(0, 10)}...</p>
                                        <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg">₹{order.totalAmount.toFixed(2)}</p>
                                        <span className={`px-2 py-1 text-sm rounded-full ${
                                            order.status === 'Completed' ? 'bg-green-200 text-green-800' :
                                            order.status === 'Preparing' ? 'bg-yellow-200 text-yellow-800' :
                                            'bg-blue-200 text-blue-800'
                                        }`}>{order.status}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrdersPage;