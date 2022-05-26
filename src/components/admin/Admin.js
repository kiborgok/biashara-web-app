import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AdminNav from "./AdminNav";
import BusinessesTable from './BusinessesPage';
import CategoriesTable from './CategoriesPage';
import UsersTable from './UsersTable';

function Admin() {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 p-2">
        <AdminNav />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <Routes>
            <Route path="" element={<h1>Admin dashboard</h1>} />
            <Route path="users" element={<UsersTable />} />
            <Route path="categories" element={<CategoriesTable />} />
            <Route path="businesses" element={<BusinessesTable />} />
          </Routes>
        </div>
      </div>
    );
}

export default Admin;
