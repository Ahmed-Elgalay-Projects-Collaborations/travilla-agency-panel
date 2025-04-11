import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      <span className="hover:text-blue-600 cursor-pointer">Home</span>
      {paths.map((path, index) => (
        <React.Fragment key={path}>
          <ChevronRight className="w-4 h-4" />
          <span className={index === paths.length - 1 ? 'text-gray-900 font-medium' : 'hover:text-blue-600 cursor-pointer'}>
            {path.charAt(0).toUpperCase() + path.slice(1)}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};