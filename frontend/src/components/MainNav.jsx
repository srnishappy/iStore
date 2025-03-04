import { Link } from 'react-router-dom';

const MainNav = () => {
  return (
    <nav className="bg-black text-white shadow-md">
      <div className="mx-auto px-6">
        <div className="flex justify-between h-16 items-center">
          {/* ซ้าย: Logo & เมนู */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-xl font-bold tracking-wide hover:text-gray-300 transition-all"
            >
              LOGO
            </Link>
            <Link to="/" className="hover:text-gray-300 transition-all">
              Home
            </Link>
            <Link to="/shop" className="hover:text-gray-300 transition-all">
              Shop
            </Link>
            <Link to="/cart" className="hover:text-gray-300 transition-all">
              Cart
            </Link>
          </div>

          {/* ขวา: Register & Login */}
          <div className="flex items-center gap-4">
            <Link
              to="/register"
              className="px-4 py-2 rounded-lg border border-gray-500 hover:border-gray-300 hover:bg-gray-800 transition-all"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition-all"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
