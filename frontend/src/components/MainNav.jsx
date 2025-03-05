import { Link } from 'react-router-dom';
import { Home, ShoppingBag, ShoppingCart, UserPlus, LogIn } from 'lucide-react';

const MainNav = () => {
  return (
    <nav className="bg-black text-white shadow-md">
      <div className="mx-auto px-6">
        <div className="flex justify-between h-14 items-center">
          {/* ซ้าย: เมนูหลัก */}
          <div className="flex items-center gap-5">
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-gray-300 transition-all"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              to="/shop"
              className="flex items-center gap-1 hover:text-gray-300 transition-all"
            >
              <ShoppingBag size={18} />
              <span>Shop</span>
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-1 hover:text-gray-300 transition-all"
            >
              <ShoppingCart size={18} />
              <span>Cart</span>
            </Link>
          </div>

          {/* ขวา: Register & Login */}
          <div className="flex items-center gap-3">
            <Link
              to="/register"
              className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-500 hover:border-gray-300 hover:bg-gray-800 transition-all"
            >
              <UserPlus size={16} />
              <span>Register</span>
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition-all"
            >
              <LogIn size={16} />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
