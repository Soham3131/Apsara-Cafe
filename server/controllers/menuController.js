// controllers/menuController.js
const MenuItem = require('../models/MenuItem');

// Get all menu items
exports.getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({});
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.addMenuItem = async (req, res) => {
    console.log("--- [BACKEND] Received request to add menu item ---");
    console.log("Request Body:", req.body);
    console.log("File Info:", req.file);

    // Destructure data from the request body
    const { name, description, price, category, sizes } = req.body;

    try {
        // Server-side validation is crucial
        if (!name || !description || !price || !category) {
            console.error("Validation Failed: A required text field is missing.");
            return res.status(400).json({ message: "Missing required fields: name, description, price, category." });
        }
        if (!req.file) {
            console.error("Validation Failed: Image file is missing.");
            return res.status(400).json({ message: 'Image file is required.' });
        }

        console.log("Parsing sizes string from req.body:", sizes);
        const parsedSizes = sizes ? JSON.parse(sizes) : {};
        console.log("Parsed sizes object is now:", parsedSizes);

        const newItem = new MenuItem({
            name,
            description,
            price: parseFloat(price), // Ensure price is correctly parsed as a number
            category,
            imageUrl: req.file.path, // URL from Cloudinary
            sizes: parsedSizes
        });
        
        console.log("Attempting to save the new item object to the database...");
        const createdItem = await newItem.save();
        console.log("Item saved successfully to database!");
        
        res.status(201).json(createdItem);

    } catch (error) {
        // This will print the full, detailed crash report to your backend terminal
        console.error("!!! [BACKEND] MENU ITEM CREATION CRASHED !!!");
        console.error(error); // Log the entire error object with its stack trace
        
        res.status(500).json({ 
            message: "Server crash during item creation. Check the backend terminal console for the detailed error.",
            error: error.message 
        });
    }
};
// Update a menu item
exports.updateMenuItem = async (req, res) => {
    const { name, description, price, category, sizes } = req.body;
    try {
        const item = await MenuItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        item.name = name || item.name;
        item.description = description || item.description;
        item.price = price || item.price;
        item.category = category || item.category;
        if (sizes) {
          item.sizes = JSON.parse(sizes);
        }

        if (req.file) {
            // Optional: Add logic here to delete the old image from Cloudinary
            item.imageUrl = req.file.path;
        }

        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};


// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (item) {
      // Optional: Add logic to remove the image from Cloudinary as well
      await item.remove();
      res.json({ message: 'Menu item removed' });
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};