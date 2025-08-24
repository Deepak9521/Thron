import React from 'react';
import Sidebar from '../pages/Sidebar';
import { Outlet } from 'react-router-dom';

function AppLayout({ userId }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar userId={userId} />
      <main style={{ marginLeft: '200px', padding: '20px', flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
