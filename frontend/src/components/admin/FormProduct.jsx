import { useEffect, useState } from 'react';
import ecomstore from '../../store/ecom-store';
import { createProduct } from '../../api/Product';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { FaSave } from 'react-icons/fa';
import UploadFile from './UploadFile';

const FormProduct = () => {
  const initialState = {
    title: '',
    description: '',
    price: '',
    quantity: '',
    categoryId: '',
    images: [],
  };

  const token = ecomstore((state) => state.token);
  const getCategory = ecomstore((state) => state.getCategory);
  const category = ecomstore((state) => state.category);
  const getProducts = ecomstore((state) => state.getProducts);
  const products = ecomstore((state) => state.products);

  const [form, setForm] = useState(initialState);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getCategory(token);
    getProducts(token, 20);
  }, [token, getCategory, getProducts]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to add this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!',
    });

    if (result.isConfirmed) {
      try {
        const res = await createProduct(token, form);
        toast.success(`Add ${res.data.title} successfully`);
        getProducts(token, 20);
      } catch (err) {
        toast.error(err.response.data.msg);
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Add New Product
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter product title"
              className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={form.title}
              onChange={handleOnChange}
            />
          </div>

          <div className="p-3">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter product description"
              className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={form.description}
              onChange={handleOnChange}
            />
          </div>

          <div className="p-3">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Price (฿)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              placeholder="Enter product price"
              className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={form.price}
              onChange={handleOnChange}
            />
          </div>

          <div className="p-3">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Quantity
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              placeholder="Enter product quantity"
              className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={form.quantity}
              onChange={handleOnChange}
            />
          </div>

          <div className="p-3">
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Category
            </label>
            <select
              id="categoryId"
              name="categoryId"
              onChange={handleOnChange}
              value={form.categoryId}
              className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              required
            >
              <option value="" disabled>
                Please Select
              </option>
              {category.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* upload img */}
        <UploadFile form={form} setForm={setForm} />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-6 w-full hover:bg-blue-600 transition-all ease-in-out transform hover:scale-105 text-sm"
        >
          <FaSave className="inline-block mr-2" /> Add Product
        </button>
      </form>

      <hr className="my-8" />

      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Product List
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border-b px-4 py-3 text-left">I</th>
              <th className="border-b px-4 py-3 text-left">Title</th>
              <th className="border-b px-4 py-3 text-left">Description</th>
              <th className="border-b px-4 py-3 text-left">Price</th>
              <th className="border-b px-4 py-3 text-left">Quantity</th>
              <th className="border-b px-4 py-3 text-left">Sold</th>
              <th className="border-b px-4 py-3 text-left">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="border-b px-4 py-2">{index + 1}</td>
                <td className="border-b px-4 py-2">{item.title}</td>
                <td className="border-b px-4 py-2">{item.description}</td>
                <td className="border-b px-4 py-2">{item.price}฿</td>
                <td className="border-b px-4 py-2">{item.quantity}</td>
                <td className="border-b px-4 py-2">{item.sold}</td>
                <td className="border-b px-4 py-2">
                  {new Date(item.updatedAt).toLocaleString()}
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormProduct;
