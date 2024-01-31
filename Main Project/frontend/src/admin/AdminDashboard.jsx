import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ResponsiveAppBar from '../assets/ResponsiveAppBar'; // Adjust the import path
import TemporaryDrawer from '../assets/TemporaryDrawer';
import MediaCard from '../assets/MediaCard';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    navigate('/');
  };
  useEffect(() => {
    const handleBrowserBack = (event) => {
      event.preventDefault();
      navigate('/login');
    };

    window.addEventListener('popstate', handleBrowserBack);

    return () => {
      window.removeEventListener('popstate', handleBrowserBack);
    };
  }, [navigate]);

  return (
    <>
      <ResponsiveAppBar />
      <br />

      {/* <TemporaryDrawer/> */}
      <div className="admin-dashboard">
        <main role="main" className="col-md-12 ml-sm-auto col-lg-12 px-4">
          <div className="col-md-12">
            <h1 className="mt-5">Welcome to the Admin Dashboard</h1>
          </div>
          <br />
          <br />

          <MediaCard/>
          <br /><br />
          <Link to="/add-product">
            <button>Add Product</button>
          </Link>
          <br />
          <br />
          <Link to="/add-item">
            <button>Add Item</button>
          </Link>
          <br />
          <br />
          <Link to="/admin-view-products">View Products</Link>
          <br />
          <br />
          <button onClick={handleLogout}>Logout</button>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
