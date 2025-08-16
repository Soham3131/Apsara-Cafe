import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminOrdersPage = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // State for all filters
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get('http://localhost:5000/api/orders', config);
            setAllOrders(data);
            setLoading(false);
        } catch (error) {
            toast.error('Could not fetch orders.');
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchOrders();
    }, []);
    
    // Filtering logic for a responsive UI
    const filteredOrders = useMemo(() => {
        return allOrders
            .filter(order => statusFilter === 'All' || order.status === statusFilter)
            .filter(order => {
                if (!dateRange.start || !dateRange.end) return true;
                const orderDate = new Date(order.createdAt);
                return orderDate >= new Date(dateRange.start) && orderDate <= new Date(dateRange.end + 'T23:59:59');
            })
            .filter(order => {
                if (!searchTerm.trim()) return true;
                const lowercasedTerm = searchTerm.toLowerCase();
                return (
                    order.orderNumber.toString().includes(lowercasedTerm) ||
                    (order.user && order.user.name.toLowerCase().includes(lowercasedTerm)) ||
                    (order.user && order.user.email.toLowerCase().includes(lowercasedTerm))
                );
            });
    }, [allOrders, searchTerm, statusFilter, dateRange]);

    const handleStatusChange = async (order, newStatus) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data: updatedOrder } = await axios.put(`http://localhost:5000/api/orders/${order._id}/status`, { status: newStatus }, config);
            toast.success(`Order #${order.orderNumber} status updated!`);
            setAllOrders(prev => prev.map(o => o._id === order._id ? updatedOrder : o));
        } catch (error) {
            toast.error('Failed to update status.');
        }
    };
    
    const handleRefund = async (order) => {
        const refundAmountStr = window.prompt(`Enter amount to refund for Order #${order.orderNumber}. (Max: ₹${order.totalAmount.toFixed(2)})`, order.totalAmount.toFixed(2));
        if (refundAmountStr === null) return;

        const refundAmount = parseFloat(refundAmountStr);
        if (isNaN(refundAmount) || refundAmount <= 0 || refundAmount > order.totalAmount) {
            return toast.error("Invalid refund amount.");
        }

        const refundNotes = window.prompt("Please provide a reason/note for this refund. (e.g., 'Customer request')");
        if (refundNotes === null || !refundNotes.trim()) {
            return toast.error("A note is required for refunds.");
        };

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const paymentId = order.paymentDetails.paymentId;
            
            const { data } = await axios.post(`http://localhost:5000/api/orders/${paymentId}/refund`, { 
                amount: refundAmount, 
                notes: refundNotes 
            }, config);
            
            toast.success(`Order #${order.orderNumber} successfully refunded!`, { duration: 5000 });
            setAllOrders(prev => prev.map(o => o._id === data.order._id ? data.order : o));
        } catch (error) {
            toast.error(error.response?.data?.message || 'Refund failed.');
        }
    };

    if (loading) return <p className="text-center p-10 font-semibold text-gray-500">Loading orders...</p>;

    return (
        <div className="space-y-6">
            <h1 className="text-4xl font-extrabold text-amber-900">Order Management</h1>
            <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" placeholder="Search by Order #, Name, or Email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="p-2 border rounded-md w-full focus:ring-amber-500 focus:border-amber-500"/>
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="p-2 border rounded-md w-full focus:ring-amber-500 focus:border-amber-500">
                        <option value="All">All Statuses</option>
                        <option value="Order Placed">Order Placed</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Ready for Pickup">Ready for Pickup</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <div className="flex items-center gap-2">
                        <input type="date" value={dateRange.start} onChange={e => setDateRange({...dateRange, start: e.target.value})} className="p-2 border rounded-md w-full focus:ring-amber-500 focus:border-amber-500"/>
                        <span className="font-semibold text-gray-500">to</span>
                        <input type="date" value={dateRange.end} onChange={e => setDateRange({...dateRange, end: e.target.value})} className="p-2 border rounded-md w-full focus:ring-amber-500 focus:border-amber-500"/>
                    </div>
                </div>
            </div>
            
            <div className="space-y-4">
                {filteredOrders.length > 0 ? filteredOrders.map(order => (
                    <OrderCard 
                        key={order._id} 
                        order={order} 
                        onStatusChange={handleStatusChange} 
                        onRefund={handleRefund}
                    />
                )) : (
                    <div className="text-center py-10 bg-white rounded-lg shadow-md">
                        <p className="font-semibold text-gray-700">No orders match your filters.</p>
                        <p className="text-sm text-gray-500">Try adjusting your search or date range.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Reusable OrderCard Component
const OrderCard = ({ order, onStatusChange, onRefund }) => {
    const [logsVisible, setLogsVisible] = useState(false);

    const statusColor = {
        'Order Placed': 'bg-blue-100 text-blue-800', 'Preparing': 'bg-yellow-100 text-yellow-800',
        'Ready for Pickup': 'bg-indigo-100 text-indigo-800', 'Completed': 'bg-green-100 text-green-800',
        'Cancelled': 'bg-red-100 text-red-800',
    };

    const handleStatusSelectChange = (e) => {
        if (order.status === 'Cancelled') {
            if (!window.confirm("WARNING! This order is CANCELLED. Changing its status is not recommended. Are you absolutely sure you want to proceed?")) {
                e.target.value = order.status;
                return;
            }
        }
        onStatusChange(order, e.target.value);
    };

    return (
        <div className="bg-white rounded-lg shadow-md transition-shadow hover:shadow-xl">
            <div className="p-4">
                <div className="flex flex-wrap justify-between items-start gap-4">
                   <div className="flex-grow">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColor[order.status] || 'bg-gray-100'}`}>{order.status}</span>
                        <p className="font-extrabold text-2xl text-amber-900 mt-1">Order #{order.orderNumber}</p>
                        <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                        </p>
                   </div>
                   <div className="flex items-center gap-4 flex-shrink-0">
                        <select 
                            value={order.status} 
                            onChange={handleStatusSelectChange}
                            disabled={order.status === 'Cancelled'}
                            className="p-2 rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 disabled:cursor-not-allowed"
                        >
                            <option value="Order Placed">Order Placed</option>
                            <option value="Preparing">Preparing</option>
                            <option value="Ready for Pickup">Ready for Pickup</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                       {order.status !== 'Cancelled' && order.paymentDetails?.status === 'Paid' && (
                           <button onClick={() => onRefund(order)} className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 font-semibold transition">
                                Refund
                            </button>
                       )}
                   </div>
                </div>
                <div className="border-t my-4 pt-4 space-y-3">
                    <div>
                        <p className="text-xs text-gray-500 font-semibold">CUSTOMER</p>
                        <p>{order.user ? `${order.user.name} - ${order.user.email}` : 'Customer details not available.'}</p>
                        {order.user?.phoneNumber && (
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Phone:</span> {order.user.phoneNumber}
                            </p>
                        )}
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-semibold">ITEMS</p>
                        <p>{Array.isArray(order.items) ? order.items.map(i => i.menuItem ? `${i.quantity}x ${i.menuItem.name}` : `${i.quantity}x (Item name not available)`).join(', ') : 'No items found.'}</p>
                    </div>
                    {order.customerNote && <div>
                        <p className="text-xs text-gray-500 font-semibold">CUSTOMER NOTE</p>
                        <p className="text-sm bg-yellow-50 border border-yellow-200 p-2 rounded-md">{order.customerNote}</p>
                    </div>}
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-2 border-t rounded-b-lg">
                <button onClick={() => setLogsVisible(!logsVisible)} className="text-sm font-semibold text-gray-600 hover:text-amber-800 w-full text-left">
                    {logsVisible ? '▼ Hide Logs' : '► Show Logs'} ({order.internalLogs?.length || 0})
                </button>
                {logsVisible && (
                    <div className="mt-2 pl-2 space-y-2 max-h-40 overflow-y-auto pr-2">
                        {order.internalLogs.slice().reverse().map(log => (
                            <div key={log._id} className="text-xs border-l-2 pl-2 border-gray-300">
                                <p className="font-bold">{log.action}</p>
                                <p className="text-gray-500">{new Date(log.timestamp).toLocaleString()}</p>
                                {log.notes && <p className="italic text-gray-800">Note: "{log.notes}"</p>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminOrdersPage;