// src/pages/MenuPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import API from '../api';
// === UPDATED AND FIXED MenuItemCard Component ===
const MenuItemCard = ({ item }) => {
    const { addToCart } = useCart();
    
    // Check for available sizes that have a price > 0
    const availableSizes = Object.keys(item.sizes || {}).filter(key => item.sizes[key] > 0);
    
    // Set the default size. If 'S' is available, use it, otherwise use the first available size.
    const defaultSize = availableSizes.includes('S') ? 'S' : availableSizes[0] || null;

    const [selectedSize, setSelectedSize] = useState(defaultSize);
    const [currentPrice, setCurrentPrice] = useState(item.price);

    useEffect(() => {
        // This effect runs when the component loads or when the selected size changes
        let price = item.price; // Default price
        if (selectedSize && item.sizes && item.sizes[selectedSize]) {
            price = item.sizes[selectedSize];
        }
        setCurrentPrice(price);
    }, [selectedSize, item]);
    
    const handleAddToCart = () => {
        // This function now correctly adds the item with its selected size and price to the cart
        const itemToAdd = {
            ...item,
            price: currentPrice,
            // Create a unique ID for cart items based on size, so you can have a Small and a Large of the same coffee in the cart
            cartId: selectedSize ? `${item._id}_${selectedSize}` : item._id,
            name: selectedSize ? `${item.name} (${selectedSize})` : item.name,
        };
        addToCart(itemToAdd);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-between transform hover:-translate-y-2 transition-transform duration-300">
            <div>
                <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover"/>
                <div className="p-4">
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-amber-900">{item.name}</h3>
                        {/* NEW: Displaying the category */}
                        <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{item.category}</span>
                    </div>
                    <p className="text-gray-600 mt-1 text-sm">{item.description}</p>
                </div>
            </div>
            <div className="p-4">
                {/* CHANGED: Show size options ONLY if more than one size is available */}
                {availableSizes.length > 1 && (
                     <div className="mb-4">
                        <p className="text-sm font-semibold mb-2">Select Size:</p>
                        <div className="flex flex-wrap gap-2">
                            {availableSizes.map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-3 py-1 border rounded-full text-sm font-semibold transition-colors ${
                                        selectedSize === size ? 'bg-amber-800 text-white border-amber-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
               
                <div className="flex justify-between items-center mt-2">
                    <span className="text-2xl font-semibold text-gray-800">₹{currentPrice}</span>
                    {/* FIXED: This button will now call the handleAddToCart function */}
                    <button onClick={handleAddToCart} className="bg-yellow-500 text-amber-900 font-bold px-4 py-2 rounded-full hover:bg-yellow-600 transition duration-300">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Main MenuPage Component with Category Filtering ---
const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); // NEW state for filtering

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const { data } = await API.get('/menu');
        setMenuItems(data);
        // NEW: Automatically get unique categories from the data
        const uniqueCategories = ['All', ...new Set(data.map(item => item.category))];
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (error) {
        toast.error('Could not fetch menu items.');
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // NEW: Filter items based on the selected category
  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="pt-24 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-extrabold text-center text-amber-900 mb-4">Our Menu</h1>
        
        {/* === NEW: Category Filter Buttons === */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-semibold transition-colors text-sm ${
                        selectedCategory === category ? 'bg-amber-800 text-white' : 'bg-white text-gray-700 shadow-sm hover:bg-gray-100'
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>

        {loading ? (
          <p className="text-center">Loading menu...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* CHANGED: Map over filteredItems instead of all menuItems */}
            {filteredItems.map(item => (
              <MenuItemCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;