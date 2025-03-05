import { useEffect, useState } from 'react';
import useEcomStore from '../../store/ecom-store';

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProducts);
  const [text, setText] = useState('');
  const actionSearchFilters = useEcomStore(
    (state) => state.actionSearchFilters
  );
  const getCategory = useEcomStore((state) => state.getCategory);
  const category = useEcomStore((state) => state.category);
  const [categorySelect, setCategorySelect] = useState([]);

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilters({ query: text });
      } else {
        getProduct();
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  const handleCheck = (e) => {
    const inCheck = String(e.target.value);
    const inState = [...categorySelect];
    const findCheck = inState.indexOf(inCheck);

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }

    setCategorySelect(inState);

    if (inState.length > 0) {
      actionSearchFilters({ category: inState });
    } else {
      getProduct();
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-black p-6 rounded-2xl shadow-xl border border-gray-300 dark:border-gray-700 transition-all duration-300">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        🔍 Search Product
      </h1>

      <input
        className="w-full px-4 py-2 border border-gray-400 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-300 outline-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all"
        placeholder="Type to search..."
        onChange={(e) => setText(e.target.value)}
      />

      <div className="mt-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          📂 Category
        </h1>
        <div className="grid grid-cols-2 gap-4">
          {category.map((item, index) => (
            <label
              key={index}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md transition-all"
            >
              <input
                onChange={handleCheck}
                value={item.id}
                type="checkbox"
                checked={categorySelect.includes(String(item.id))}
                className="accent-black dark:accent-white"
              />
              <span className="text-gray-900 dark:text-gray-100">
                {item.name}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
