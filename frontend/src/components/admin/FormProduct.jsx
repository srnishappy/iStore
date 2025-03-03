import { useEffect, useState } from 'react';
import ecomstore from '../../store/ecom-store';
import { createProduct } from '../../api/Product';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { FaSave } from 'react-icons/fa';
import UploadFile from './UploadFile';
import { Link } from 'react-router-dom';

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
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    getCategory(token);
    getProducts(token, 100);
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
        toast.success(`Added ${res.data.title} successfully`);
        getProducts(token, 20);
        setForm(initialState); // รีเซ็ตฟอร์มหลังเพิ่ม
      } catch (err) {
        toast.error(err.response.data.msg);
      }
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-xl rounded-xl w-full max-w-7xl">
      {/* ฟอร์มเพิ่มสินค้า */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add New Product
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Title
            </label>
            <input
              name="title"
              type="text"
              placeholder="Enter product title"
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200"
              value={form.title}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Description
            </label>
            <textarea
              name="description"
              placeholder="Enter product description"
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200 min-h-24"
              value={form.description}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price (฿)
            </label>
            <input
              name="price"
              type="number"
              placeholder="Enter product price"
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200"
              value={form.price}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quantity
            </label>
            <input
              name="quantity"
              type="number"
              placeholder="Enter product quantity"
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200"
              value={form.quantity}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              name="categoryId"
              onChange={handleOnChange}
              value={form.categoryId}
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200 appearance-none bg-white"
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

        <UploadFile form={form} setForm={setForm} />

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-6 rounded-lg w-full hover:bg-blue-700 transition transform hover:scale-105 text-sm font-medium shadow-md flex items-center justify-center"
        >
          <FaSave className="inline-block mr-2 text-lg" /> Add Product
        </button>
      </form>

      <hr className="my-10 border-gray-200" />

      {/* รายการสินค้า */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Product List
      </h2>

      <div className="w-full overflow-x-auto rounded-lg shadow">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Picture
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Price (฿)
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Qty
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Sold
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Updated At
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.images.length > 0 ? (
                    <img
                      src={item.images[0].url}
                      className="h-20 w-20 object-cover rounded"
                      alt={item.title}
                    />
                  ) : (
                    <div className="h-20 w-20 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.title || '-'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {item.description || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  {item.price}฿
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.sold}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(item.updatedAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-y-2">
                  <Link
                    to={'/admin/product/' + item.id}
                    className="block bg-yellow-500 text-white px-4 py-2 rounded-md text-center hover:bg-yellow-600 transition-colors duration-150"
                  >
                    Edit
                  </Link>
                  <Link
                    to={'/admin/product/' + item.id}
                    className="block bg-red-500 text-white px-4 py-2 rounded-md text-center hover:bg-red-600 transition-colors duration-150"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormProduct;
