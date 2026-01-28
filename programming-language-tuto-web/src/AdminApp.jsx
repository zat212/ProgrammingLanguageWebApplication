import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './pages/tutor/AdminSidebar';
import AdminNavbar from './pages/tutor/AdminNavbar';

const AdminApp = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSignOut = () => {
    console.log("Admin signed out");
    // add your sign-out logic here
  };

  return (
<div className="flex bg-gray-50 min-h-screen">
  {/* Sidebar */}
  <div className='fixed'>
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        admin={true}
        onSignOut={handleSignOut}
      />
  </div>

  {/* Main content area */}
  <div className="flex-1 flex flex-col ml-64">
    {/* Navbar */}
    <AdminNavbar
      onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      adminName="Admin User"
      onSignOut={handleSignOut}
    />

    {/* Scrollable Outlet */}
    <main className="flex-1 mt-16 bg-gray-100">
      <Outlet />
    </main>
  </div>
</div>

  );
};

export default AdminApp;
