import { useEffect, useState } from 'react';
import {
  createCategory,
  ListCategory,
  RemoveCategory,
} from '../../api/Category';
import ecomstore from '../../store/ecom-store';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const FormCategory = () => {
  const token = ecomstore((state) => state.token);
  const [name, setName] = useState('');
  // const [category, setCategory] = useState([]);
  const category = ecomstore((state) => state.category);
  const getCategory = ecomstore((state) => state.getCategory);

  useEffect(() => {
    getCategory(token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      return toast.warning('Please enter a category name!');
    }

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Add category "${name}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    try {
      const res = await createCategory(token, { name });
      Swal.fire({
        title: 'Success!',
        text: `Category "${res.data.name}" added successfully!`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
      getCategory(token);
      setName('');
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    try {
      const res = await RemoveCategory(token, id);
      getCategory(token);
      Swal.fire(
        'Deleted!',
        `Category "${res.data.name}" has been deleted.`,
        'success'
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-xl rounded-xl max-w-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        <span className="">Category Management</span>
      </h1>

      <form className="mb-8 flex gap-3" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Enter category name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md font-medium"
          type="submit"
        >
          Add
        </button>
      </form>

      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">
          Available Categories
        </h2>
        {category.length === 0 ? (
          <p className="text-gray-500 text-center py-4 italic">
            No categories found. Add your first category above.
          </p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {category.map((item) => (
              <li
                className="flex justify-between items-center py-3 px-2 hover:bg-gray-50 rounded-md transition duration-150"
                key={item.id || item._id}
              >
                <span className="text-gray-800 font-medium">{item.name}</span>
                <button
                  className="bg-red-500  text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 shadow-sm text-sm font-medium"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 text-center font-bold  text-bold text-black">
        <p>Total categories: {category.length}</p>
      </div>
    </div>
  );
};

export default FormCategory;
