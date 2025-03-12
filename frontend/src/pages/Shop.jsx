import { useEffect } from 'react';
import ProductCard from '../components/card/ProductCard';
import useEcomStore from '../store/ecom-store';
import SearchCard from '../components/card/SearchCard';
import CartCard from '../components/card/CartCard';

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProducts);
  const products = useEcomStore((state) => state.products);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex">
      {/* searchbar */}
      <div className="w-1/4 p-4 h-screen bg-gray-100">
        <SearchCard />
      </div>

      {/* Product */}
      <div className="w-1/2 p-4 h-screen overflow-y-auto">
        <div className="flex items-center space-x-4 mb-4">
          <p className="text-2xl font-bold ml-4">All Product</p>
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
            {products.length} Items
          </span>
        </div>

        {products.length > 0 ? (
          <div className="flex gap-5">
            {products.map((item, index) => (
              <ProductCard item={item} key={index} />
            ))}
          </div>
        ) : (
          // No Results Message
          <div className="bg-[#2A2A2A] border border-[#3A3A3A] text-white p-6 rounded-xl mb-4 text-center">
            <div className="flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-3 text-gray-400"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              <h3 className="text-2xl font-bold mb-2">No Products Found</h3>
              <p className="text-lg">
                We couldn't find any products matching your search criteria.
                Please try different keywords or adjust your filters.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Cart */}
      <div className="w-1/4 p-4 bg-gray-100 h-screen overflow-y-auto">
        <CartCard />
      </div>
    </div>
  );
};

export default Shop;
