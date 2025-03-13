import { useEffect, useState } from 'react';
import useEcomStore from '../../store/ecom-store';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProducts);
  const [text, setText] = useState('');
  const actionSearchFilters = useEcomStore(
    (state) => state.actionSearchFilters
  );
  const getCategory = useEcomStore((state) => state.getCategory);
  const category = useEcomStore((state) => state.category);
  const [categorySelect, setCategorySelect] = useState([]);
  const [price, setPrice] = useState([0, 10000]);
  const [ok, setOk] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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

  useEffect(() => {
    actionSearchFilters({ price });
  }, [ok]);

  const handlePrice = (value) => {
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="w-full bg-[#1E1E1E] text-white p-2 lg:p-4 rounded-2xl shadow-2xl flex flex-col">
      {/* Header with collapse button for mobile */}
      <div className="flex items-center justify-between mb-2 lg:mb-4">
        <div className="flex items-center space-x-2 text-lg lg:text-2xl font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-400"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span>Search Product</span>
        </div>
        <button
          onClick={toggleCollapse}
          className="md:hidden p-2 rounded-lg hover:bg-[#2C2C2C]"
          aria-label={isCollapsed ? 'Expand filters' : 'Collapse filters'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform ${
              isCollapsed ? 'rotate-180' : ''
            }`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      {/* Search input - always visible */}
      <div className="relative mb-2 lg:mb-4">
        <input
          className="w-full bg-[#2C2C2C] border-none rounded-xl px-3 lg:px-4 py-2 lg:py-3 pl-9 lg:pl-10 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Type to search..."
          onChange={(e) => setText(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-2 lg:left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>

      {/* Collapsible filter section */}
      <div
        className={`space-y-2 lg:space-y-4 ${
          isCollapsed ? 'hidden' : 'block'
        } md:block`}
      >
        {/* Category section */}
        <div>
          <div className="flex items-center space-x-2 text-base lg:text-xl font-bold mb-2 lg:mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-400"
            >
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
            <span>Category</span>
          </div>
          <div className="grid grid-cols-2 gap-1 lg:gap-2">
            {category && category.length > 0 ? (
              category.map((item, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-2 bg-[#2C2C2C] p-1 lg:p-2 rounded-xl cursor-pointer hover:bg-[#3C3C3C] transition-colors text-xs lg:text-base"
                >
                  <input
                    type="checkbox"
                    value={item.id}
                    checked={categorySelect.includes(String(item.id))}
                    onChange={handleCheck}
                    className="form-checkbox rounded text-blue-500 bg-[#1E1E1E] border-gray-600"
                  />
                  <span className="truncate">{item.name}</span>
                </label>
              ))
            ) : (
              <div className="col-span-2 text-center py-1 lg:py-2 bg-[#2C2C2C] rounded-xl">
                No categories available
              </div>
            )}
          </div>
        </div>

        {/* Price Range section */}
        <div>
          <div className="flex items-center space-x-2 text-base lg:text-xl font-bold mb-2 lg:mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-400"
            >
              <line x1="12" y1="20" x2="12" y2="10"></line>
              <line x1="18" y1="20" x2="18" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="16"></line>
            </svg>
            <span>Price Range</span>
          </div>
          <div className="bg-[#2C2C2C] p-2 lg:p-3 rounded-xl">
            <div className="flex justify-between mb-2 lg:mb-3 text-xs lg:text-base">
              <span>Min: {price[0]} ฿</span>
              <span>Max: {price[1]} ฿</span>
            </div>
            <Slider
              onChange={handlePrice}
              range
              min={0}
              max={10000}
              defaultValue={[0, 10000]}
              railStyle={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              trackStyle={[{ backgroundColor: '#4A90E2' }]}
              handleStyle={[
                { backgroundColor: 'white', borderColor: '#4A90E2' },
                { backgroundColor: 'white', borderColor: '#4A90E2' },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
