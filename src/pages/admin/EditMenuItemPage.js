import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../../api'; // Using your central API client
import toast from 'react-hot-toast';

const EditMenuItemPage = () => {
    const { id } = useParams(); // Gets the item's ID from the URL
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ name: '', description: '', category: '' });
    const [priceData, setPriceData] = useState({ s_price: '', m_price: '', l_price: '' });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const { data } = await API.get(`/menu/${id}`);
                setFormData({ name: data.name, description: data.description, category: data.category });
                setPriceData({
                    s_price: data.sizes?.S || data.price || '',
                    m_price: data.sizes?.M || '',
                    l_price: data.sizes?.L || ''
                });
                setImagePreview(data.imageUrl);
                setLoading(false);
            } catch (error) {
                toast.error("Could not fetch item details.");
                navigate('/admin/menu');
            }
        };
        fetchItem();
    }, [id, navigate]);

    const handleInputChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handlePriceChange = e => setPriceData({ ...priceData, [e.target.name]: e.target.value });
    const handleFileChange = e => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        const basePrice = priceData.s_price || priceData.m_price || priceData.l_price;
        if (!basePrice || parseFloat(basePrice) <= 0) {
            toast.error("Please enter a valid price for at least one size.");
            return;
        }

        setIsSubmitting(true);
        const loadingToast = toast.loading('Updating item...');

        const uploadData = new FormData();
        uploadData.append('name', formData.name);
        uploadData.append('description', formData.description);
        uploadData.append('category', formData.category);
        uploadData.append('price', basePrice);
        if (image) { // Only append the image if a new one was selected
            uploadData.append('image', image);
        }
        
        const sizes = {
            S: priceData.s_price ? parseFloat(priceData.s_price) : null,
            M: priceData.m_price ? parseFloat(priceData.m_price) : null,
            L: priceData.l_price ? parseFloat(priceData.l_price) : null,
        };
        uploadData.append('sizes', JSON.stringify(sizes));

        try {
            // The central API client automatically adds the token
            await API.put(`/menu/${id}`, uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            toast.dismiss(loadingToast);
            toast.success('Item updated successfully!');
            navigate('/admin/menu'); // Navigate back to the main menu list
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error(error.response?.data?.message || 'Failed to update item.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div className="text-center p-10 font-semibold">Loading item details...</div>;
    }

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <Link to="/admin/menu" className="text-amber-800 hover:text-amber-900">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </Link>
                <h1 className="text-4xl font-extrabold text-amber-900">Edit Menu Item</h1>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <h3 className="font-bold text-lg mb-2">Item Image</h3>
                        {imagePreview && <img src={imagePreview} alt="Item Preview" className="w-full h-auto object-cover rounded-md mb-4 border" />}
                        <input type="file" name="image" onChange={handleFileChange} accept="image/*" className="p-2 border rounded-md w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"/>
                        <p className="text-xs text-gray-500 mt-2">Select a new file to replace the current image.</p>
                    </div>
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                             <input type="text" name="name" placeholder="Item Name" value={formData.name} onChange={handleInputChange} className="p-3 border rounded-md w-full" required/>
                             <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} className="p-3 border rounded-md w-full" required/>
                             <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} rows="4" className="p-3 border rounded-md w-full" required></textarea>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg border">
                             <h3 className="font-bold text-lg mb-4">Pricing by Size</h3>
                             <div className="space-y-3">
                                <div className="flex items-center"><label className="w-12 font-semibold">S:</label><input type="number" step="0.01" name="s_price" placeholder="e.g., 100" value={priceData.s_price} onChange={handlePriceChange} className="p-2 border rounded-md flex-1"/></div>
                                <div className="flex items-center"><label className="w-12 font-semibold">M:</label><input type="number" step="0.01" name="m_price" placeholder="e.g., 120" value={priceData.m_price} onChange={handlePriceChange} className="p-2 border rounded-md flex-1"/></div>
                                <div className="flex items-center"><label className="w-12 font-semibold">L:</label><input type="number" step="0.01" name="l_price" placeholder="e.g., 150" value={priceData.l_price} onChange={handlePriceChange} className="p-2 border rounded-md flex-1"/></div>
                             </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    <button type="button" onClick={() => navigate('/admin/menu')} className="bg-gray-200 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-300 font-bold">
                        Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting} className="bg-amber-800 text-white py-2 px-6 rounded-md hover:bg-amber-900 font-bold disabled:bg-gray-400">
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditMenuItemPage;