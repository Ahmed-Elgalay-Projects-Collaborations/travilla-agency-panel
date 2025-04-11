import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  LayoutDashboard, 
  Building2, 
  MessageSquare, 
  Contact, 
  Mail,
  Star,
  User,
  Plane,
  Hotel,
  MessageCircle,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Logo } from '../assets/logo';
import { useAuth } from '../auth/AuthContext';

export const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [expandedMenus, setExpandedMenus] = useState({
    trips: location.pathname.startsWith('/trips'),
    hotels: location.pathname.startsWith('/hotels')
  });

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Building2, label: 'About', path: '/about' },
    { icon: MessageSquare, label: 'Services', path: '/services' },
    { icon: Users, label: 'Clients', path: '/clients' },
    { icon: Star, label: 'Ratings', path: '/ratings' },
    { icon: User, label: 'Account', path: '/account' },
    {
      icon: Plane,
      label: 'Trips',
      path: '/trips',
      submenu: [
        { label: 'Manage Trips', path: '/trips' },
        { label: 'Reservations', path: '/trips/reservations' }
      ]
    },
    {
      icon: Hotel,
      label: 'Hotels',
      path: '/hotels',
      submenu: [
        { label: 'Manage Hotels', path: '/hotels' },
        { label: 'Reservations', path: '/hotels/reservations' }
      ]
    },
    { icon: MessageCircle, label: 'Chats', path: '/chats' },
    { icon: Contact, label: 'Contact Info', path: '/contact' },
  ];

  const toggleSubmenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <Logo />
      </div>
      
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
            {user?.name.split(' ').map(n => n[0]).join('')}
          </div>
          <span>{user?.name}</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleSubmenu(item.label.toLowerCase())}
                    className={`w-full flex items-center justify-between p-2 rounded hover:bg-gray-700`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    {expandedMenus[item.label.toLowerCase()] ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {expandedMenus[item.label.toLowerCase()] && (
                    <ul className="ml-6 mt-2 space-y-2">
                      {item.submenu.map((subitem) => (
                        <li key={subitem.path}>
                          <Link
                            to={subitem.path}
                            className={`flex items-center space-x-3 p-2 rounded ${
                              location.pathname === subitem.path ? 'bg-blue-600' : 'hover:bg-gray-700'
                            }`}
                          >
                            <span>{subitem.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 p-2 rounded ${
                    location.pathname === item.path ? 'bg-blue-600' : 'hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};