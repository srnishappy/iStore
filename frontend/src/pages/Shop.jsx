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
    <div className="flex ">
      {/* searchbar */}
      <div className="w-1/4 p-4 h-screen bg-gray-100">
        <SearchCard />
      </div>

      {/* Product */}
      <div className="w-1/2 p-4 h-screen overflow-y-auto">
        <div className="flex items-center space-x-4 mb-4">
          <p className="text-2xl font-bold ml-4">All Product</p>
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
            {products?.length || 0} Items
          </span>
        </div>

        {products && products.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {products.map((item, index) => (
              <ProductCard item={item} key={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full text-gray-500 py-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <p className="mt-6 text-3xl font-bold">No products found</p>
            <p className="mt-4 text-xl max-w-md text-center">
              Try adjusting your search or filter criteria to find products
            </p>
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
