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
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Category Management
      </h1>

      <form className="mb-6 flex gap-2" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Enter category name"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          type="submit"
        >
          Add
        </button>
      </form>

      <ul className="divide-y divide-gray-300">
        {category.map((item) => (
          <li
            className="flex justify-between items-center py-2"
            key={item.id || item._id}
          >
            <span className="text-gray-700 font-medium">{item.name}</span>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormCategory;
