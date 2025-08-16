import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Reusable component for displaying key statistics cards
const StatCard = ({ title, value, icon, note }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-start justify-between">
        <div>
            <p className="text-gray-500 text-sm font-semibold uppercase">{title}</p>
            <p className="text-3xl font-bold text-amber-900">{value}</p>
            {note && <p className="text-xs text-gray-400 mt-1">{note}</p>}
        </div>
        <div className="bg-amber-100 text-amber-800 text-3xl p-3 rounded-full">
            {icon}
        </div>
    </div>
);

// Helper to format a Date object to 'YYYY-MM-DD' string
const formatDate = (date) => date.toISOString().split('T')[0];

const DashboardPage = () => {
    // State to hold all dashboard data
    const [stats, setStats] = useState({
        todayRevenue: 0, todayOrders: 0, thisMonthRevenue: 0, thisMonthOrders: 0,
        totalRevenue: 0, totalOrders: 0, periodStats: []
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('This Month');

    // State for the custom date range picker
    const [dateRange, setDateRange] = useState({
        start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
    });

    // Main function to fetch all dashboard data
    const fetchData = useCallback(async (start, end) => {
        if (!start || !end) return;
        
        try {
            setLoading(true);
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` },
                params: { startDate: start, endDate: end }
            };
            
            const [statsResponse, ordersResponse] = await Promise.all([
                axios.get('http://localhost:5000/api/orders/stats', config),
                axios.get('http://localhost:5000/api/orders', config)
            ]);

            setStats(statsResponse.data);
            setRecentOrders(ordersResponse.data.slice(0, 5));
            setLoading(false);
        } catch (error) {
            toast.error('Could not fetch dashboard data.');
            setLoading(false);
        }
    }, []);
    
    // Initial data fetch when the component mounts
    useEffect(() => {
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const today = new Date();
        fetchData(formatDate(startOfMonth), formatDate(today));
    }, [fetchData]);

    // --- THIS FUNCTION CONTAINS THE FIX ---
    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
        const today = new Date();
        let start = new Date();
        const end = new Date(); // End date is always today for these quick filters

        // CORRECTED LOGIC: Set the time to the beginning of the day (midnight)
        if (filter === 'Today') {
            start.setHours(0, 0, 0, 0); 
        } else if (filter === 'This Week') {
            start.setDate(today.getDate() - today.getDay()); // Start of the week (Sunday)
            start.setHours(0, 0, 0, 0); 
        } else if (filter === 'This Month') {
            start = new Date(today.getFullYear(), today.getMonth(), 1); // Already at midnight
        }
        
        const newRange = { start: formatDate(start), end: formatDate(end) };
        setDateRange(newRange);
        fetchData(newRange.start, newRange.end);
    };
    
    const handleCustomDateApply = () => {
        if (dateRange.start && dateRange.end) {
            setActiveFilter('Custom');
            fetchData(dateRange.start, dateRange.end);
        } else {
            toast.error("Please select both a start and end date for the custom range.");
        }
    }
    
    // Chart configuration
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: `Sales Performance (${activeFilter})`,
                font: { size: 18 }
            },
        },
        scales: { y: { beginAtZero: true } }
    };

    const chartData = {
        labels: stats.periodStats.map(d => new Date(d._id + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })),
        datasets: [{
            label: 'Daily Sales (₹)',
            data: stats.periodStats.map(d => d.dailySales),
            backgroundColor: 'rgba(129, 73, 4, 0.7)',
        }]
    };
    
    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-extrabold text-amber-900">Dashboard</h1>

            {/* QUICK STATS CARDS (always visible) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Today's Revenue" value={`₹${stats.todayRevenue.toFixed(2)}`} icon={'📈'} />
                <StatCard title="Today's Orders" value={stats.todayOrders} icon={'📋'} />
                <StatCard title="This Month's Revenue" value={`₹${stats.thisMonthRevenue.toFixed(2)}`} icon={'💰'} />
                <StatCard title="This Month's Orders" value={stats.thisMonthOrders} icon={'📅'} />
            </div>

            {/* DYNAMIC FILTER CONTROLS */}
            <div className="p-4 bg-white rounded-lg shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">Show Stats For:</span>
                        {['Today', 'This Week', 'This Month'].map(period => (
                            <button key={period} onClick={() => handleFilterClick(period)} 
                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${activeFilter === period ? 'bg-amber-800 text-white' : 'bg-gray-200 text-gray-700'}`}>
                                {period}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="date" value={dateRange.start} onChange={e => setDateRange({...dateRange, start: e.target.value})} className="p-2 border rounded-md"/>
                        <span>to</span>
                        <input type="date" value={dateRange.end} onChange={e => setDateRange({...dateRange, end: e.target.value})} className="p-2 border rounded-md"/>
                        <button onClick={handleCustomDateApply} className="bg-amber-800 text-white font-bold px-4 py-2 rounded-md hover:bg-amber-900">Apply</button>
                    </div>
                </div>
            </div>

            {loading ? <div className="text-center p-10 font-semibold">Updating dashboard...</div> : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold text-amber-900 mb-4">
                            Revenue: ₹{stats.totalRevenue.toFixed(2)} | Orders: {stats.totalOrders}
                        </h2>
                        {stats.periodStats.length > 0 ? (
                            <Bar options={chartOptions} data={chartData} />
                        ) : (
                            <div className="text-center py-20 text-gray-500">No sales data for this period.</div>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold text-amber-900 mb-4">Recent Orders ({activeFilter})</h2>
                        <div className="space-y-4">
                            {recentOrders.length > 0 ? recentOrders.map(order => (
                                <div key={order._id} className="flex justify-between items-center border-b pb-2">
                                    <div>
                                        <p className="font-semibold">Order #{order.orderNumber}</p>
                                        <p className="text-xs text-gray-500">{order.user.name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold">₹{order.totalAmount.toFixed(2)}</p>
                                        <span className={`px-2 py-0.5 text-xs rounded-full font-semibold bg-blue-100 text-blue-800`}>{order.status}</span>
                                    </div>
                                </div>
                            )) : <p className="text-sm text-gray-500">No recent orders in this period.</p>}
                            <Link to="/admin/orders" className="text-amber-800 font-semibold hover:underline text-sm mt-4 block text-center">
                                Go to Full Order Management &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;