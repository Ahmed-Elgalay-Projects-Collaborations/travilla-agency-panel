import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FadeIn } from '../animations/FadeIn';

export const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Breadcrumbs />
          <FadeIn>
            <Outlet />
          </FadeIn>
        </div>
      </div>
    </div>
  );
};