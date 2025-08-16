import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import API from '../../api';

const AdminMenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [formData, setFormData] = useState({ name: '', description: '', category: '' });
    const [priceData, setPriceData] = useState({ s_price: '', m_price: '', l_price: '' });
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // To prevent double clicks

    // Fetches all menu items to display in the list
    const fetchMenu = async () => {
        try {
            const { data } = await API.get('/api/menu');
            setMenuItems(data);
        } catch (error) {
            console.error("Failed to fetch menu items:", error);
            toast.error("Could not load menu items.");
        }
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    // Handlers for form input changes
    const handleInputChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handlePriceChange = e => setPriceData({ ...priceData, [e.target.name]: e.target.value });
    const handleFileChange = e => setImage(e.target.files[0]);

    // Main function to handle form submission
    const handleSubmit = async e => {
        e.preventDefault();
        if (isSubmitting) return; // Prevent multiple submissions

        // --- Frontend Validation ---
        if (!image) {
            toast.error("Please select an image for the item.");
            return;
        }
        const basePrice = priceData.s_price || priceData.m_price || priceData.l_price;
        if (!basePrice || parseFloat(basePrice) <= 0) {
            toast.error("Please enter a valid price for at least one size.");
            return;
        }
        
        setIsSubmitting(true);
        const loadingToast = toast.loading('Adding item...');

        // Using FormData is necessary for file uploads
        const uploadData = new FormData();
        uploadData.append('name', formData.name);
        uploadData.append('description', formData.description);
        uploadData.append('category', formData.category);
        uploadData.append('image', image);
        uploadData.append('price', basePrice);

        const sizes = {
            S: priceData.s_price ? parseFloat(priceData.s_price) : undefined,
            M: priceData.m_price ? parseFloat(priceData.m_price) : undefined,
            L: priceData.l_price ? parseFloat(priceData.l_price) : undefined,
        };
        uploadData.append('sizes', JSON.stringify(sizes));

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { 
                headers: { 
                    'Content-Type': 'multipart/form-data', 
                    Authorization: `Bearer ${userInfo.token}` 
                } 
            };
            await axios.API('/api/menu', uploadData, config);
            
            toast.dismiss(loadingToast);
            toast.success('Item added successfully!');
            fetchMenu(); // Refresh the list of items
            
            // Reset the form completely
            e.target.reset();
            setFormData({ name: '', description: '', category: '' });
            setPriceData({ s_price: '', m_price: '', l_price: '' });
            setImage(null);

        } catch (error) {
            toast.dismiss(loadingToast);
            // --- DETAILED ERROR LOGGING ---
            // This will give you a clear, detailed report in the browser console if something goes wrong.
            console.error("--- FAILED TO ADD MENU ITEM ---");
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Data:", error.response.data);
                console.error("Status:", error.response.status);
                console.error("Headers:", error.response.headers);
                // Display the specific error message from the backend
                toast.error(error.response.data.message || 'An error occurred on the server.');
            } else if (error.request) {
                // The request was made but no response was received
                console.error("Request:", error.request);
                toast.error('No response from server. Is the backend running?');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error Message:', error.message);
                toast.error('An error occurred while sending the request.');
            }
            console.error("---------------------------------");
        } finally {
            setIsSubmitting(false); // Re-enable the submit button
        }
    };
    
    // Function to handle item deletion
    const handleDelete = async (id) => {
        // ... (delete logic remains the same)
    };

    return (
        <div>
            <h1 className="text-4xl font-extrabold text-amber-900 mb-8">Manage Menu</h1>
            
            {/* Add Item Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-4">Add New Menu Item</h2>
                <form onSubmit={handleSubmit}>
                    {/* Form layout remains the same */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <input type="text" name="name" placeholder="Item Name" onChange={handleInputChange} className="p-3 border rounded-md w-full" required/>
                            <input type="text" name="category" placeholder="Category (e.g., Coffee, Snacks)" onChange={handleInputChange} className="p-3 border rounded-md w-full" required/>
                            <textarea name="description" placeholder="Description" onChange={handleInputChange} className="p-3 border rounded-md w-full" required></textarea>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Item Image</label>
                                <input type="file" name="image" onChange={handleFileChange} accept="image/*" className="p-2 border rounded-md w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100" required/>
                             </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg border">
                             <h3 className="font-bold text-lg mb-2">Pricing by Size</h3>
                             <p className="text-sm text-gray-500 mb-4">The 'S' price will be the default display price. Leave fields blank for sizes that are not available.</p>
                             <div className="space-y-3">
                                <div className="flex items-center">
                                    <label className="w-12 font-semibold">S:</label>
                                    <input type="number" step="0.01" name="s_price" placeholder="e.g., 100" onChange={handlePriceChange} className="p-2 border rounded-md flex-1"/>
                                </div>
                                <div className="flex items-center">
                                    <label className="w-12 font-semibold">M:</label>
                                    <input type="number" step="0.01" name="m_price" placeholder="e.g., 120" onChange={handlePriceChange} className="p-2 border rounded-md flex-1"/>
                                </div>
                                <div className="flex items-center">
                                    <label className="w-12 font-semibold">L:</label>
                                    <input type="number" step="0.01" name="l_price" placeholder="e.g., 150" onChange={handlePriceChange} className="p-2 border rounded-md flex-1"/>
                                </div>
                             </div>
                        </div>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="mt-6 w-full bg-amber-800 text-white py-3 rounded-md hover:bg-amber-900 transition-all duration-300 font-bold disabled:bg-gray-400">
                        {isSubmitting ? 'Adding Item...' : 'Add Item to Menu'}
                    </button>
                </form>
            </div>

            {/* Menu List */}
            <div className="bg-white shadow-md rounded-lg">
                {/* ... (Menu list display code remains the same) ... */}
            </div>
        </div>
    );
};

export default AdminMenuPage;