// src/components/AdminLayout.js
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout = () => {
    const activeLink = 'bg-amber-800 text-white';
    const normalLink = 'hover:bg-amber-100 hover:text-amber-900';

    return (
        <div className="pt-16 min-h-screen flex">
            <aside className="w-64 bg-white shadow-md p-4 fixed h-full">
                <nav className="flex flex-col space-y-2">
                    <NavLink to="/admin/dashboard" className={({ isActive }) => `${isActive ? activeLink : normalLink} rounded-md p-2 font-semibold`}>Dashboard</NavLink>
                    <NavLink to="/admin/orders" className={({ isActive }) => `${isActive ? activeLink : normalLink} rounded-md p-2 font-semibold`}>Order Management</NavLink>
                    <NavLink to="/admin/menu" className={({ isActive }) => `${isActive ? activeLink : normalLink} rounded-md p-2 font-semibold`}>Menu Management</NavLink>
                </nav>
            </aside>
            <main className="flex-1 ml-64 p-8 bg-gray-50">
                <Outlet /> {/* Child routes will be rendered here */}
            </main>
        </div>
    );
};

export default AdminLayout;