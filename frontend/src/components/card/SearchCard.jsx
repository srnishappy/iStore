import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProducts);
  const products = useEcomStore((state) => state.products);
  const [text, setText] = useState('');
  const actionSearchFilters = useEcomStore(
    (state) => state.actionSearchFilters
  );

  useEffect(() => {
    const delay = setTimeout(() => {
      actionSearchFilters({ query: text });
      if (!text) {
        getProduct();
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  const handleClearSearch = () => {
    setText('');
    actionSearchFilters({ query: '' });
    getProduct();
  };

  return (
    <div className="bg-black p-4 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold text-white mb-4">Search Product</h1>

      <div className="relative">
        <input
          value={text}
          className="border border-gray-700 bg-white text-black rounded-md w-full pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          placeholder="Search Product..."
          onChange={(e) => setText(e.target.value)}
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={20} />
        </div>
        {text && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {products && (
        <div className="mt-4 text-sm text-gray-400">
          {products.length} products found
        </div>
      )}
    </div>
  );
};

export default SearchCard;
