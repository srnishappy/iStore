import { useEffect, useState } from 'react';
import ecomstore from '../../store/ecom-store';
import { createProduct, readProduct, updateProduct } from '../../api/Product';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { FaSave } from 'react-icons/fa';
import UploadFile from './UploadFile';
import { useNavigate, useParams } from 'react-router-dom';

const FormProduct = () => {
  const initialState = {
    title: '',
    description: '',
    price: '',
    quantity: '',
    categoryId: '',
    images: [],
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const token = ecomstore((state) => state.token);
  const getCategory = ecomstore((state) => state.getCategory);
  const category = ecomstore((state) => state.category);

  const [form, setForm] = useState(initialState);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    getCategory(token);
    fetchProduct(token, id, form);
  }, []);

  const fetchProduct = async (token, id, form) => {
    try {
      const res = await readProduct(token, id, form);
      setForm(res.data);
      console.log(res.data);
    } catch (err) {
      toast.error(err.response.data.msg);
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to Edit this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!',
    });

    if (result.isConfirmed) {
      try {
        const res = await updateProduct(token, id, form);
        toast.success(`Edit product ${res.data.title} successfully`);
        navigate('/admin/product');
      } catch (err) {
        toast.error(err.response.data.msg);
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg w-full">
      {/* ฟอร์มเพิ่มสินค้า */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Edit Product
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Title
            </label>
            <input
              name="title"
              type="text"
              placeholder="Enter product title"
              className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
              value={form.title}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="p-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Description
            </label>
            <textarea
              name="description"
              placeholder="Enter product description"
              className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
              value={form.description}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="p-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (฿)
            </label>
            <input
              name="price"
              type="number"
              placeholder="Enter product price"
              className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
              value={form.price}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="p-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <input
              name="quantity"
              type="number"
              placeholder="Enter product quantity"
              className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
              value={form.quantity}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="p-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="categoryId"
              onChange={handleOnChange}
              value={form.categoryId}
              className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
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
          className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600 transition transform hover:scale-105 text-sm"
        >
          <FaSave className="inline-block mr-2" /> Edit Product
        </button>
      </form>

      {/* รายการสินค้า */}

      <div className="w-full"></div>
    </div>
  );
};

export default FormProduct;
