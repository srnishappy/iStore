import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  ShoppingBag,
  ShoppingCart,
  UserPlus,
  LogIn,
  Menu,
  X,
} from 'lucide-react';

const MainNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-lg backdrop-blur-md">
      <div className="container mx-auto px-8">
        <div className="flex justify-between items-center h-20">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {[
              { name: 'Home', to: '/', Icon: Home },
              { name: 'Shop', to: '/shop', Icon: ShoppingBag },
              { name: 'Cart', to: '/cart', Icon: ShoppingCart },
            ].map(({ name, to, Icon }) => (
              <Link
                key={name}
                to={to}
                className="flex items-center gap-3 text-xl font-medium hover:text-blue-500 transition-all duration-300 relative group"
              >
                <Icon size={24} />
                <span className="text-lg">{name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Authentication */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/register"
              className="flex items-center gap-3 px-6 py-3 rounded-lg border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              <UserPlus size={20} />
              <span className="text-lg">Register</span>
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-3 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-300 shadow-md"
            >
              <LogIn size={20} />
              <span className="text-lg">Login</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-500 focus:outline-none"
            >
              {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-5 border-t border-gray-700">
            {[
              { name: 'Home', to: '/', Icon: Home },
              { name: 'Shop', to: '/shop', Icon: ShoppingBag },
              { name: 'Cart', to: '/cart', Icon: ShoppingCart },
            ].map(({ name, to, Icon }) => (
              <Link
                key={name}
                to={to}
                className="flex items-center gap-4 py-4 px-6 text-xl hover:text-blue-500 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon size={24} />
                <span className="text-lg">{name}</span>
              </Link>
            ))}
            <div className="flex flex-col gap-4 pt-4 border-t border-gray-700">
              <Link
                to="/register"
                className="flex items-center gap-4 px-6 py-4 rounded-lg border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition-all text-center justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserPlus size={20} />
                <span className="text-lg">Register</span>
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-4 px-6 py-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all text-center justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn size={20} />
                <span className="text-lg">Login</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNav;
