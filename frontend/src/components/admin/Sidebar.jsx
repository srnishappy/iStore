import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Settings,
  FolderKanban,
  ShoppingCart,
  LogOut,
  ListCheck,
  Shield,
} from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="bg-gradient-to-b from-blue-950 to-gray-900 w-64 text-white flex flex-col h-screen">
      {/* Header */}
      <div className="h-24 bg-gradient-to-r from-blue-900 to-gray-800 flex items-center justify-center text-2xl font-bold text-white shadow-md border-b border-blue-800/30">
        <Shield size={28} className="text-blue-300 mr-2" />
        <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          Admin Panel
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-3">
        <NavLink
          to={'/admin'}
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 ${
              isActive
                ? 'bg-blue-800/20 text-white shadow-lg border-l-4 border-blue-400'
                : 'text-blue-100 hover:bg-blue-800/10 hover:text-white hover:translate-x-1'
            }`
          }
        >
          <LayoutDashboard size={22} className="text-blue-300" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to={'/admin/manage'}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 ${
              isActive
                ? 'bg-blue-800/20 text-white shadow-lg border-l-4 border-blue-400'
                : 'text-blue-100 hover:bg-blue-800/10 hover:text-white hover:translate-x-1'
            }`
          }
        >
          <Settings size={22} className="text-blue-300" />
          <span>Manage</span>
        </NavLink>

        <NavLink
          to={'/admin/category'}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 ${
              isActive
                ? 'bg-blue-800/20 text-white shadow-lg border-l-4 border-blue-400'
                : 'text-blue-100 hover:bg-blue-800/10 hover:text-white hover:translate-x-1'
            }`
          }
        >
          <FolderKanban size={22} className="text-blue-300" />
          <span>Category</span>
        </NavLink>

        <NavLink
          to={'/admin/product'}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 ${
              isActive
                ? 'bg-blue-800/20 text-white shadow-lg border-l-4 border-blue-400'
                : 'text-blue-100 hover:bg-blue-800/10 hover:text-white hover:translate-x-1'
            }`
          }
        >
          <ShoppingCart size={22} className="text-blue-300" />
          <span>Product</span>
        </NavLink>

        <NavLink
          to={'/admin/order'}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 ${
              isActive
                ? 'bg-blue-800/20 text-white shadow-lg border-l-4 border-blue-400'
                : 'text-blue-100 hover:bg-blue-800/10 hover:text-white hover:translate-x-1'
            }`
          }
        >
          <ListCheck size={22} className="text-blue-300" />
          <span>Orders</span>
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="p-4 bg-gradient-to-r from-blue-900 to-gray-800 shadow-inner border-t border-blue-800/30">
        <NavLink
          to={'/admin'}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 text-red-200 hover:bg-red-500/20 hover:text-white"
        >
          <LogOut size={22} className="text-red-200" />
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
