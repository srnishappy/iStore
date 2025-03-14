import { useEffect, useState } from 'react';
import ProductCard from '../components/card/ProductCard';
import useEcomStore from '../store/ecom-store';
import SearchCard from '../components/card/SearchCard';
import CartCard from '../components/card/CartCard';
import { Filter, X, ShoppingBag, SlidersHorizontal } from 'lucide-react';

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProducts);
  const products = useEcomStore((state) => state.products);
  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const carts = useEcomStore((state) => state.carts);
  const actionGetTotalPrice = useEcomStore(
    (state) => state.actionGetTotalPrice
  );

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowSearch(false);
        setShowCart(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 w-full">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between px-4 py-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white sticky top-0 z-10 w-full shadow-md">
        <button
          onClick={() => {
            setShowSearch(true);
            setShowCart(false);
          }}
          className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          <SlidersHorizontal size={20} />
        </button>
        <div className="flex-1 flex items-center justify-center space-x-3 px-2">
          <p className="text-lg font-bold">All Products</p>
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {products.length} Items
          </span>
        </div>
        <button
          onClick={() => {
            setShowCart(true);
            setShowSearch(false);
          }}
          className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors relative"
        >
          <ShoppingBag size={20} />
          {carts.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {carts.length}
            </span>
          )}
        </button>
      </div>

      {/* Search Sidebar */}
      <aside
        className={`${
          showSearch ? 'fixed inset-0 z-20' : 'hidden lg:block'
        } lg:static lg:z-auto w-full lg:w-1/4 h-screen lg:h-auto bg-white lg:shadow-md transition-all duration-300`}
      >
        {showSearch && (
          <div className="lg:hidden flex justify-between items-center p-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
            <h2 className="text-xl font-bold">Filters</h2>
            <button
              onClick={() => setShowSearch(false)}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        )}
        <div className="p-4 lg:p-6 overflow-y-auto max-h-screen">
          <div className="hidden lg:block mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Filters</h2>
            <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
          </div>
          <SearchCard />
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full lg:w-2/4 p-4 lg:p-8 overflow-y-auto flex-grow">
        <div className="hidden lg:flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {products.length} Items
            </span>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 w-full">
            {products.map((item, index) => (
              <ProductCard item={item} key={index} />
            ))}
          </div>
        ) : (
          <div className="bg-white shadow-md border border-gray-200 text-gray-800 p-6 lg:p-8 rounded-xl mb-4 text-center w-full mt-4">
            <h3 className="text-2xl font-bold mb-3">No Products Found</h3>
            <p className="text-lg text-gray-600">
              Try searching with different keywords or adjust filters.
            </p>
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      <aside
        className={`${
          showCart ? 'fixed inset-0 z-20' : 'hidden lg:block'
        } lg:static lg:z-auto w-full lg:w-1/4 h-screen lg:h-auto bg-white lg:shadow-md transition-all duration-300`}
      >
        {showCart && (
          <div className="lg:hidden flex justify-between items-center p-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button
              onClick={() => setShowCart(false)}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        )}
        <div className="p-4 lg:p-6 overflow-y-auto max-h-screen">
          <div className="hidden lg:block mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Your Cart</h2>
            <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
          </div>
          <CartCard onClose={() => setShowCart(false)} />
        </div>
      </aside>

      {/* Cart Button in Mobile */}
      {!showCart && !showSearch && carts.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-800 via-gray-900 to-black p-4 flex justify-between items-center shadow-lg z-10">
          <div>
            <p className="text-white font-bold text-lg">
              {actionGetTotalPrice()} ฿
            </p>
            <p className="text-gray-300 text-sm">{carts.length} items</p>
          </div>
          <button
            onClick={() => setShowCart(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold flex items-center space-x-2 transition-colors shadow-md"
          >
            <ShoppingBag size={18} />
            <span>View Cart</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;
