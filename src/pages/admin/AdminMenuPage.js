// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import API from '../../api';

// const AdminMenuPage = () => {
//     const [menuItems, setMenuItems] = useState([]);
//     const [formData, setFormData] = useState({ name: '', description: '', category: '' });
//     const [priceData, setPriceData] = useState({ s_price: '', m_price: '', l_price: '' });
//     const [image, setImage] = useState(null);
//     const [isSubmitting, setIsSubmitting] = useState(false); // To prevent double clicks

//     // Fetches all menu items to display in the list
//     const fetchMenu = async () => {
//         try {
//             const { data } = await API.get('/menu');
//             setMenuItems(data);
//         } catch (error) {
//             console.error("Failed to fetch menu items:", error);
//             toast.error("Could not load menu items.");
//         }
//     };

//     useEffect(() => {
//         fetchMenu();
//     }, []);

//     // Handlers for form input changes
//     const handleInputChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
//     const handlePriceChange = e => setPriceData({ ...priceData, [e.target.name]: e.target.value });
//     const handleFileChange = e => setImage(e.target.files[0]);

//     // Main function to handle form submission
//     const handleSubmit = async e => {
//         e.preventDefault();
//         if (isSubmitting) return; // Prevent multiple submissions

//         // --- Frontend Validation ---
//         if (!image) {
//             toast.error("Please select an image for the item.");
//             return;
//         }
//         const basePrice = priceData.s_price || priceData.m_price || priceData.l_price;
//         if (!basePrice || parseFloat(basePrice) <= 0) {
//             toast.error("Please enter a valid price for at least one size.");
//             return;
//         }
        
//         setIsSubmitting(true);
//         const loadingToast = toast.loading('Adding item...');

//         // Using FormData is necessary for file uploads
//         const uploadData = new FormData();
//         uploadData.append('name', formData.name);
//         uploadData.append('description', formData.description);
//         uploadData.append('category', formData.category);
//         uploadData.append('image', image);
//         uploadData.append('price', basePrice);

//         const sizes = {
//             S: priceData.s_price ? parseFloat(priceData.s_price) : undefined,
//             M: priceData.m_price ? parseFloat(priceData.m_price) : undefined,
//             L: priceData.l_price ? parseFloat(priceData.l_price) : undefined,
//         };
//         uploadData.append('sizes', JSON.stringify(sizes));

//         try {
//             const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//             const config = { 
//                 headers: { 
//                     'Content-Type': 'multipart/form-data', 
//                     Authorization: `Bearer ${userInfo.token}` 
//                 } 
//             };
//             await API.post('/menu', uploadData, config);
            
//             toast.dismiss(loadingToast);
//             toast.success('Item added successfully!');
//             fetchMenu(); // Refresh the list of items
            
//             // Reset the form completely
//             e.target.reset();
//             setFormData({ name: '', description: '', category: '' });
//             setPriceData({ s_price: '', m_price: '', l_price: '' });
//             setImage(null);

//         } catch (error) {
//             toast.dismiss(loadingToast);
//             // --- DETAILED ERROR LOGGING ---
//             // This will give you a clear, detailed report in the browser console if something goes wrong.
//             console.error("--- FAILED TO ADD MENU ITEM ---");
//             if (error.response) {
//                 // The request was made and the server responded with a status code
//                 // that falls out of the range of 2xx
//                 console.error("Data:", error.response.data);
//                 console.error("Status:", error.response.status);
//                 console.error("Headers:", error.response.headers);
//                 // Display the specific error message from the backend
//                 toast.error(error.response.data.message || 'An error occurred on the server.');
//             } else if (error.request) {
//                 // The request was made but no response was received
//                 console.error("Request:", error.request);
//                 toast.error('No response from server. Is the backend running?');
//             } else {
//                 // Something happened in setting up the request that triggered an Error
//                 console.error('Error Message:', error.message);
//                 toast.error('An error occurred while sending the request.');
//             }
//             console.error("---------------------------------");
//         } finally {
//             setIsSubmitting(false); // Re-enable the submit button
//         }
//     };
    
//     // Function to handle item deletion
//     const handleDelete = async (id) => {
//         // ... (delete logic remains the same)
//     };

//     return (
//         <div>
//             <h1 className="text-4xl font-extrabold text-amber-900 mb-8">Manage Menu</h1>
            
//             {/* Add Item Form */}
//             <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//                 <h2 className="text-2xl font-bold mb-4">Add New Menu Item</h2>
//                 <form onSubmit={handleSubmit}>
//                     {/* Form layout remains the same */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="space-y-4">
//                             <input type="text" name="name" placeholder="Item Name" onChange={handleInputChange} className="p-3 border rounded-md w-full" required/>
//                             <input type="text" name="category" placeholder="Category (e.g., Coffee, Snacks)" onChange={handleInputChange} className="p-3 border rounded-md w-full" required/>
//                             <textarea name="description" placeholder="Description" onChange={handleInputChange} className="p-3 border rounded-md w-full" required></textarea>
//                              <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Item Image</label>
//                                 <input type="file" name="image" onChange={handleFileChange} accept="image/*" className="p-2 border rounded-md w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100" required/>
//                              </div>
//                         </div>
//                         <div className="bg-gray-50 p-4 rounded-lg border">
//                              <h3 className="font-bold text-lg mb-2">Pricing by Size</h3>
//                              <p className="text-sm text-gray-500 mb-4">The 'S' price will be the default display price. Leave fields blank for sizes that are not available.</p>
//                              <div className="space-y-3">
//                                 <div className="flex items-center">
//                                     <label className="w-12 font-semibold">S:</label>
//                                     <input type="number" step="0.01" name="s_price" placeholder="e.g., 100" onChange={handlePriceChange} className="p-2 border rounded-md flex-1"/>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <label className="w-12 font-semibold">M:</label>
//                                     <input type="number" step="0.01" name="m_price" placeholder="e.g., 120" onChange={handlePriceChange} className="p-2 border rounded-md flex-1"/>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <label className="w-12 font-semibold">L:</label>
//                                     <input type="number" step="0.01" name="l_price" placeholder="e.g., 150" onChange={handlePriceChange} className="p-2 border rounded-md flex-1"/>
//                                 </div>
//                              </div>
//                         </div>
//                     </div>
//                     <button type="submit" disabled={isSubmitting} className="mt-6 w-full bg-amber-800 text-white py-3 rounded-md hover:bg-amber-900 transition-all duration-300 font-bold disabled:bg-gray-400">
//                         {isSubmitting ? 'Adding Item...' : 'Add Item to Menu'}
//                     </button>
//                 </form>
//             </div>

//             {/* Menu List */}
//             <div className="bg-white shadow-md rounded-lg">
//         <h2 className="text-2xl font-bold p-4 border-b">Existing Menu Items</h2>
//         {menuItems.map(item => (
//             <div key={item._id} className="flex items-center justify-between p-4 border-b hover:bg-gray-50">
//                 <div className="flex items-center">
//                     <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4"/>
//                     <div>
//                         <p className="font-bold">{item.name}</p>
//                         <p className="text-sm text-gray-500">₹{item.price}{item.sizes && (item.sizes.M || item.sizes.L) ? ' (S)' : ''}</p>
//                     </div>
//                 </div>
//                 <div className="flex gap-2">
//                     {/* NEW: Edit button that links to the new page */}
//                     <Link to={`/admin/menu/edit/${item._id}`} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm font-semibold">
//                         Edit
//                     </Link>
//                     <button onClick={() => handleDelete(item._id)} className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 text-sm font-semibold">
//                         Delete
//                     </button>
//                 </div>
//         </div>
//     );
// };

// export default AdminMenuPage;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../../api';

const AdminMenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [formData, setFormData] = useState({ name: '', description: '', category: '' });
    const [priceData, setPriceData] = useState({ s_price: '', m_price: '', l_price: '' });
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchMenu = async () => {
        try {
            const { data } = await API.get('/menu');
            setMenuItems(data);
        } catch (error) {
            console.error("Failed to fetch menu items:", error);
            toast.error("Could not load menu items.");
        }
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    const handleInputChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handlePriceChange = e => setPriceData({ ...priceData, [e.target.name]: e.target.value });
    const handleFileChange = e => setImage(e.target.files[0]);

    const handleSubmit = async e => {
        e.preventDefault();
        if (isSubmitting) return;

        if (!image) {
            toast.error("Please select an image for the new item.");
            return;
        }
        const basePrice = priceData.s_price || priceData.m_price || priceData.l_price;
        if (!basePrice || parseFloat(basePrice) <= 0) {
            toast.error("Please enter a valid price for at least one size.");
            return;
        }
        
        setIsSubmitting(true);
        const loadingToast = toast.loading('Adding item...');

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
            await API.post('/menu', uploadData);
            
            toast.dismiss(loadingToast);
            toast.success('Item added successfully!');
            fetchMenu();
            
            e.target.reset();
            setFormData({ name: '', description: '', category: '' });
            setPriceData({ s_price: '', m_price: '', l_price: '' });
            setImage(null);

        } catch (error) {
            toast.dismiss(loadingToast);
            console.error("--- FAILED TO ADD MENU ITEM ---", error.response);
            toast.error(error.response?.data?.message || 'An error occurred on the server.');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
            try {
                await API.delete(`/menu/${id}`);
                toast.success('Item deleted successfully!');
                fetchMenu();
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to delete item.');
            }
        }
    };

    return (
        <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-amber-900 mb-8">Manage Menu</h1>
            
            {/* Add Item Form */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-4">Add New Menu Item</h2>
                <form onSubmit={handleSubmit}>
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
                            <p className="text-sm text-gray-500 mb-4">The 'S' price will be the default display price.</p>
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

            {/* --- RESPONSIVE MENU LIST SECTION --- */}
            <div className="bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold p-4 border-b">Existing Menu Items</h2>
                <div className="divide-y divide-gray-200">
                    {menuItems.map(item => (
                        <div key={item._id} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center flex-grow">
                                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4 flex-shrink-0"/>
                                <div className="flex-grow">
                                    <p className="font-bold">{item.name}</p>
                                    <p className="text-sm text-gray-500">₹{item.price}{item.sizes && (item.sizes.M || item.sizes.L) ? ' (S)' : ''}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 self-end sm:self-center flex-shrink-0">
                                <Link to={`/admin/menu/edit/${item._id}`} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm font-semibold">
                                    Edit
                                </Link>
                                <button onClick={() => handleDelete(item._id)} className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 text-sm font-semibold">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
    );
};

export default AdminMenuPage;