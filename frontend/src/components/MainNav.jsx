import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  ShoppingBag,
  ShoppingCart,
  UserPlus,
  LogIn,
  Menu,
  X,
  ChevronDown,
  User,
  History,
  LogOut,
} from 'lucide-react';
import useEcomStore from '../store/ecom-store';

const MainNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const carts = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  const logout = useEcomStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-lg backdrop-blur-md">
      <div className="container mx-auto px-8">
        <div className="flex justify-between items-center h-20">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {[
              {
                name: 'Home',
                to: '/',
                Icon: Home,
              },
              {
                name: 'Shop',
                to: '/shop',
                Icon: ShoppingBag,
              },
              {
                name: 'Cart',
                to: '/cart',
                Icon: ShoppingCart,
                badge: carts.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 bg-blue-600 text-xs text-white rounded-full -mr-5 -mt-3">
                    {carts.length}
                  </span>
                ),
              },
            ].map(({ name, to, Icon, badge }) => (
              <Link
                key={name}
                to={to}
                className="relative flex items-center gap-3 text-xl font-medium hover:text-blue-500 transition-all duration-300"
              >
                <Icon size={24} />
                <span className="text-lg">{name}</span>
                {badge}
              </Link>
            ))}
          </div>

          {/* Authentication */}
          <div className="hidden md:flex items-center gap-8">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 px-6 py-3 rounded-lg text-white hover:bg-blue-500/20 transition-all duration-300"
                >
                  <img
                    className="w-12 h-12 rounded-full border-2 border-blue-400 shadow-md"
                    src="https://i.pinimg.com/736x/a3/31/a8/a331a8d0a8ff50827c6cb3437f336a30.jpg"
                    alt="User Avatar"
                  />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{user.name || 'User'}</span>
                    <span className="text-sm text-gray-300">My Account</span>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`ml-2 transition-transform duration-300 ${
                      isDropdownOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 ease-in-out scale-100 origin-top-right z-10">
                    <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                      <div className="flex items-center space-x-3">
                        <img
                          className="w-10 h-10 rounded-full border-2 border-white"
                          src="https://i.pinimg.com/736x/a3/31/a8/a331a8d0a8ff50827c6cb3437f336a30.jpg"
                          alt="User Avatar"
                        />
                        <div>
                          <p className="font-medium">{user.name || 'User'}</p>
                          <p className="text-sm text-blue-100">
                            {user.email || 'user@example.com'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      {/* <Link
                        to="/user/profile"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User size={18} className="mr-3 text-blue-500" />
                        <span>My Profile</span>
                      </Link> */}

                      <Link
                        to="/user/history"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <History size={18} className="mr-3 text-blue-500" />
                        <span>Order History</span>
                      </Link>

                      <div className="border-t border-gray-200 my-2"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 text-red-500 hover:bg-red-50 transition-colors duration-200"
                      >
                        <LogOut size={18} className="mr-3" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
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
              {
                name: 'Home',
                to: '/',
                Icon: Home,
              },
              {
                name: 'Shop',
                to: '/shop',
                Icon: ShoppingBag,
              },
              {
                name: 'Cart',
                to: '/cart',
                Icon: ShoppingCart,
                badge: carts.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 bg-red-600 text-xs text-white rounded-full -mr-2 -mt-2">
                    {carts.length}
                  </span>
                ),
              },
            ].map(({ name, to, Icon, badge }) => (
              <Link
                key={name}
                to={to}
                className="relative flex items-center gap-4 py-4 px-6 text-xl hover:text-blue-500 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon size={24} />
                <span className="text-lg">{name}</span>
                {badge}
              </Link>
            ))}
            {user && (
              <div className="flex flex-col gap-4 pt-4 border-t border-gray-700">
                {/* <Link
                  to="/user/profile"
                  className="flex items-center gap-4 px-6 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={20} />
                  <span className="text-lg font-medium">My Profile</span>
                </Link> */}
                <Link
                  to="/user/history"
                  className="flex items-center gap-4 px-6 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <History size={20} />
                  <span className="text-lg font-medium">Order History</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-4 px-6 py-4 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300"
                >
                  <LogOut size={20} />
                  <span className="text-lg font-medium">Logout</span>
                </button>
              </div>
            )}
            {!user && (
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
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNav;
