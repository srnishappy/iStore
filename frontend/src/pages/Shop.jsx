import { useEffect } from 'react';
import ProductCard from '../components/card/ProductCard';
import useEcomStore from '../store/ecom-store';
import SearchCard from '../components/card/SearchCard';

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
        <p className="text-2xl font-bold mb-4">All Product</p>
        <div className="flex flex-wrap gap-4">
          {products.map((item, index) => (
            <ProductCard item={item} key={index} />
          ))}
          {/* Product Card */}

          {/* Product Card */}
        </div>
      </div>
      {/* Cart */}
      <div className="w-1/4 p-4 bg-gray-100 h-screen overflow-y-auto">Cart</div>
    </div>
  );
};
export default Shop;
