import { useEffect, useState } from 'react';
import ecomstore from '../../store/ecom-store';
import { createProduct } from '../../api/Product';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import {
  FaSave,
  FaEdit,
  FaTrash,
  FaBox,
  FaShoppingCart,
  FaTags,
} from 'react-icons/fa';
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
    setForm({ ...form, [name]: value });
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
        toast.success(`Added ${res.data.title} successfully`);
        getProducts(token, 20);
        setForm(initialState); // รีเซ็ตฟอร์มหลังเพิ่ม
      } catch (err) {
        toast.error(err.response.data.msg);
      }
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* ฟอร์มเพิ่มสินค้า */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8 border border-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-4">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <FaBox className="mr-3" /> Add New Product
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Title <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                type="text"
                placeholder="Enter product title"
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-700"
                value={form.title}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="categoryId"
                onChange={handleOnChange}
                value={form.categoryId}
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-700"
                required
              >
                <option value="" disabled>
                  Please Select Category
                </option>
                {category.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Description
              </label>
              <textarea
                name="description"
                placeholder="Enter product description"
                rows="4"
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-700"
                value={form.description}
                onChange={handleOnChange}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Price (฿) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">฿</span>
                </div>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="border border-gray-300 p-3 pl-8 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-700"
                  value={form.price}
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                name="quantity"
                type="number"
                placeholder="Enter product quantity"
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-700"
                value={form.quantity}
                onChange={handleOnChange}
                required
              />
            </div>
          </div>

          <UploadFile form={form} setForm={setForm} />

          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-6 rounded-lg w-full hover:bg-blue-700 transition-all shadow-md flex items-center justify-center font-medium"
            >
              <FaSave className="mr-2 text-lg" /> Add Product
            </button>
          </div>
        </form>
      </div>

      {/* รายการสินค้า */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center">
            <FaShoppingCart className="mr-3" /> Product List
          </h2>
          <div className="text-white text-sm bg-indigo-700 px-3 py-1 rounded-full">
            {products.length} products
          </div>
        </div>

        <div className="p-6 overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm leading-normal">
                <th className="py-3 px-4 text-left font-semibold">#</th>
                <th className="py-3 px-4 text-left font-semibold">Title</th>
                <th className="py-3 px-4 text-left font-semibold">
                  Description
                </th>
                <th className="py-3 px-4 text-left font-semibold">Price (฿)</th>
                <th className="py-3 px-4 text-left font-semibold">Qty</th>
                <th className="py-3 px-4 text-left font-semibold">Sold</th>
                <th className="py-3 px-4 text-left font-semibold">
                  Updated At
                </th>
                <th className="py-3 px-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {products.length > 0 ? (
                products.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-all"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 font-medium">
                      {item.title || '-'}
                    </td>
                    <td className="py-3 px-4 max-w-xs truncate">
                      {item.description || '-'}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-50 text-blue-600 py-1 px-2 rounded-lg font-medium">
                        ฿
                        {Number(item.price).toLocaleString('th-TH', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </td>
                    <td className="py-3 px-4">{item.quantity}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`py-1 px-2 rounded-lg font-medium ${
                          item.sold > 0
                            ? 'bg-green-50 text-green-600'
                            : 'bg-gray-50 text-gray-600'
                        }`}
                      >
                        {item.sold}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {new Date(item.updatedAt).toLocaleString('th-TH', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                      })}
                    </td>
                    <td className="py-3 px-4 flex space-x-1">
                      <button
                        className="bg-amber-500 text-white p-2 rounded-lg hover:bg-amber-600 transition-all"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-gray-500">
                    No products found. Add your first product above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FormProduct;
