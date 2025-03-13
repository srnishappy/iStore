import { useEffect, useState } from 'react';
import ProductCard from '../components/card/ProductCard';
import useEcomStore from '../store/ecom-store';
import SearchCard from '../components/card/SearchCard';
import CartCard from '../components/card/CartCard';
import { Filter, X, ShoppingBag } from 'lucide-react';

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
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#ffff]">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between px-2 py-3 bg-[#1E1E1E] text-white sticky top-0 z-10 w-full">
        <button
          onClick={() => {
            setShowSearch(true);
            setShowCart(false);
          }}
          className="p-2 rounded-lg bg-[#2C2C2C] hover:bg-[#3C3C3C]"
        >
          <Filter size={20} />
        </button>
        <div className="flex-1 flex items-center justify-center space-x-2">
          <p className="text-lg font-bold">All Products</p>
          <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
            {products.length} Items
          </span>
        </div>
        <button
          onClick={() => {
            setShowCart(true);
            setShowSearch(false);
          }}
          className="p-2 rounded-lg bg-[#2C2C2C] hover:bg-[#3C3C3C] relative"
        >
          <ShoppingBag size={20} />
          {carts.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {carts.length}
            </span>
          )}
        </button>
      </div>

      <aside
        className={`${
          showSearch ? 'fixed inset-0 z-20' : 'hidden lg:block'
        } lg:static lg:z-auto w-full lg:w-1/5 h-screen lg:h-auto bg-white`}
      >
        {showSearch && (
          <div className="lg:hidden flex justify-end p-2">
            <button
              onClick={() => setShowSearch(false)}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              <X size={20} className="text-black" />
            </button>
          </div>
        )}
        <div className="p-2 lg:p-4 overflow-y-auto max-h-screen">
          <SearchCard />
        </div>
      </aside>

      <main className="w-full lg:w-3/5 p-2 lg:p-4 overflow-y-auto flex-grow">
        <div className="hidden lg:flex items-center space-x-4 mb-4">
          <p className="text-2xl font-bold text-black">All Products</p>
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
            {products.length} Items
          </span>
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-4 w-full">
            {products.map((item, index) => (
              <ProductCard item={item} key={index} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-200 border border-gray-300 text-black p-4 lg:p-6 rounded-xl mb-4 text-center w-full">
            <h3 className="text-2xl font-bold mb-2">No Products Found</h3>
            <p className="text-lg">
              Try searching with different keywords or adjust filters.
            </p>
          </div>
        )}
      </main>

      <aside
        className={`${
          showCart ? 'fixed inset-0 z-20' : 'hidden lg:block'
        } lg:static lg:z-auto w-full lg:w-1/5 h-screen lg:h-auto bg-white`}
      >
        {showCart && (
          <div className="lg:hidden flex justify-end p-2">
            <button
              onClick={() => setShowCart(false)}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              <X size={20} className="text-black" />
            </button>
          </div>
        )}
        <div className="p-4 overflow-y-auto max-h-screen">
          <CartCard onClose={() => setShowCart(false)} />
        </div>
      </aside>

      {!showCart && !showSearch && carts.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#1E1E1E] p-4 flex justify-between items-center border-t border-gray-600">
          <div>
            <p className="text-white font-bold">{actionGetTotalPrice()} ฿</p>
            <p className="text-gray-400 text-sm">{carts.length} items</p>
          </div>
          <button
            onClick={() => setShowCart(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-xl font-semibold flex items-center space-x-2"
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
