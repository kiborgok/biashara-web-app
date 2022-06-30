import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom';
import AdminNav from "./AdminNav";
import BusinessesTable from './BusinessesPage';
import CategoriesTable from './CategoriesPage';
import Dashboard from './Dashboard';
import {Navigate} from "react-router-dom"
import useUser from '../../hooks/useUser';

function Admin() {
  const user = useUser()
  if(!user) return <Navigate to="/" replace={true} />
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 p-2">
        <AdminNav />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <Routes>
            <Route path="" element={<Dashboard />} />
            <Route path="categories" element={<CategoriesTable />} />
            <Route path="businesses" element={<BusinessesTable />} />
          </Routes>
        </div>
      </div>
    );
}

export default Admin;
