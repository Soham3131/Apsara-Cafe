// src/App.js (Updated)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MenuPage from './pages/MenuPage';
import MyOrdersPage from './pages/MyOrdersPage';
import AdminLayout from './components/AdminLayout';

// --- Import Admin Components ---
import AdminRoute from './components/AdminRoute';
import DashboardPage from './pages/admin/DashboardPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminMenuPage from './pages/admin/AdminMenuPage';
import CartPage from "./pages/CartPage"
import EditMenuItemPage from './pages/admin/EditMenuItemPage';
import Footer from './components/Footer';

const HomePage = () => <Hero />;

function App() {
  return (
    <Router>
      <Navbar />
   
      <Toaster position="top-right" />
       
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />

          {/* --- Admin Routes --- */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route element={<AdminLayout />}> {/* Nest routes inside the layout */}
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="orders" element={<AdminOrdersPage />} />
                <Route path="menu" element={<AdminMenuPage />} />
                <Route path="menu/edit/:id" element={<EditMenuItemPage />} />
            </Route>
          </Route>
        </Routes>
          <Footer/>
      </main>
    </Router>
  );
}

export default App;