import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Settings,
  FolderKanban,
  ShoppingCart,
  LogOut,
} from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 w-64 text-white flex flex-col h-screen">
      {/* Header */}
      <div className="h-24 bg-gray-900 flex items-center justify-center text-2xl font-bold text-white shadow-md">
        Admin Panel
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        <NavLink
          to={'/admin'}
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-md text-lg font-medium transition duration-300 ${
              isActive
                ? 'bg-gray-900 text-white shadow-md'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white hover:scale-105'
            }`
          }
        >
          <LayoutDashboard size={22} className="text-gray-400" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to={'/admin/manage'}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-md text-lg font-medium transition duration-300 ${
              isActive
                ? 'bg-gray-900 text-white shadow-md'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white hover:scale-105'
            }`
          }
        >
          <Settings size={22} className="text-gray-400" />
          <span>Manage</span>
        </NavLink>

        <NavLink
          to={'/admin/category'}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-md text-lg font-medium transition duration-300 ${
              isActive
                ? 'bg-gray-900 text-white shadow-md'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white hover:scale-105'
            }`
          }
        >
          <FolderKanban size={22} className="text-gray-400" />
          <span>Category</span>
        </NavLink>

        <NavLink
          to={'/admin/product'}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-md text-lg font-medium transition duration-300 ${
              isActive
                ? 'bg-gray-900 text-white shadow-md'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white hover:scale-105'
            }`
          }
        >
          <ShoppingCart size={22} className="text-gray-400" />
          <span>Product</span>
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="p-4 bg-gray-900 shadow-md">
        <NavLink
          to={'/admin'}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-md text-lg font-medium transition duration-300 ${
              isActive
                ? 'bg-gray-900 text-white shadow-md'
                : 'text-gray-400 hover:bg-red-700 hover:text-white hover:scale-105'
            }`
          }
        >
          <LogOut size={22} className="text-gray-400" />
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
