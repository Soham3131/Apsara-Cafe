// // server.js
// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const multer = require('multer'); // NEW: Import multer to identify its specific errors

// // Load env vars
// dotenv.config();

// // Connect to database
// connectDB();

// const app = express();

// // Body parser middleware
// app.use(express.json());

// // CORS middleware
// app.use(cors());

// // Mount routers
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/menu', require('./routes/menuRoutes'));
// app.use('/api/orders', require('./routes/orderRoutes'));

// // Simple route for testing
// app.get('/', (req, res) => {
//   res.send('Apsara Cafe API is running...');
// });

// // ===================================================================
// // NEW: Custom error handler for Multer and other server errors
// // This MUST be placed after all your app.use() routes to function correctly.
// app.use((err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
//     // A Multer error occurred when uploading (e.g., file type not allowed, file too large).
//     console.error("!!! MULTER ERROR CAUGHT !!!", err);
//     return res.status(400).json({ message: `File upload error: ${err.message}` });
//   } else if (err) {
//     // An unknown server error occurred.
//     console.error("!!! AN UNKNOWN ERROR OCCURRED !!!", err);
//     return res.status(500).json({ message: `An unexpected error occurred: ${err.message}` });
//   }
//   // If no error, just continue
//   next();
// });
// // ===================================================================


// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const multer = require("multer");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());

// ✅ Allowed origins (local + deployed frontend)
const allowedOrigins = [
  "http://localhost:3000",              // local React dev
  "https://apsara-cafe.vercel.app",     // deployed frontend
];

// ✅ CORS middleware (supports cookies + credentials)
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // important for cookies (JWT in cookie/session)
  })
);

// Mount routers
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/menu", require("./routes/menuRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Simple route for testing
app.get("/", (req, res) => {
  res.send("Apsara Cafe API is running...");
});

// ===================================================================
// Error handler (Multer + general errors)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error("!!! MULTER ERROR CAUGHT !!!", err);
    return res
      .status(400)
      .json({ message: `File upload error: ${err.message}` });
  } else if (err) {
    console.error("!!! SERVER ERROR !!!", err);
    return res
      .status(500)
      .json({ message: `An unexpected error occurred: ${err.message}` });
  }
  next();
});
// ===================================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
