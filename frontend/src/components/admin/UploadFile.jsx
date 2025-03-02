import { useState } from 'react';
import { toast } from 'react-toastify';
import Resize from 'react-image-file-resizer';
import { removeFiles, uploadFiles } from '../../api/Product';
import useEcomStore from '../../store/ecom-store';

const UploadFile = ({ form, setForm }) => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const token = useEcomStore((state) => state.token);

  const handleOnChange = (e) => {
    const files = e.target.files;
    if (files) {
      setUploading(true);
      let allFiles = form.images;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) {
          toast.error(`❌ ไฟล์ ${file.name} ไม่ใช่รูปภาพ!`);
          continue;
        }
        Resize.imageFileResizer(
          file,
          720,
          720,
          'JPEG',
          100,
          0,
          (data) => {
            uploadFiles(token, data)
              .then((res) => {
                allFiles.push(res.data);
                setForm({
                  ...form,
                  images: allFiles,
                });
                toast.success(`✅ อัปโหลดรูปสำเร็จ!`);
              })
              .catch((err) => {
                toast.error(`❌ อัปโหลดรูปไม่สำเร็จ!`);
                console.log(err);
              })
              .finally(() => {
                setUploading(false);
              });
          },
          'base64'
        );
      }
    }
  };

  const handleRemove = (public_id) => {
    setLoading(true);
    const images = form.images;
    const newImages = images.filter((item) => item.public_id !== public_id);
    setForm({
      ...form,
      images: newImages,
    });
    removeFiles(token, public_id)
      .then(() => {
        toast.success(`Delete the photo successfully!`);
      })
      .catch((err) => {
        toast.error(`Failed to delete the photo!`);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="my-6 bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Upload Image</h3>

      {uploading && (
        <div className="flex items-center gap-2 text-blue-600 bg-blue-50 p-3 rounded-md mb-4">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>กำลังอัปโหลดรูป...</span>
        </div>
      )}

      {/* รายการรูปภาพที่อัปโหลด - ปรับปรุงให้แสดงรูปได้มากขึ้น */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex flex-nowrap gap-4 py-2 min-w-full">
          {form.images && form.images.length > 0 ? (
            form.images.map((item, index) => (
              <div key={index} className="relative flex-shrink-0 w-40 group">
                <div className="overflow-hidden rounded-lg bg-gray-100 border border-gray-200 h-40">
                  <img
                    src={item.url}
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                    alt={`image-${index}`}
                  />
                </div>
                <button
                  onClick={() => handleRemove(item.public_id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full cursor-pointer hover:bg-red-600 shadow-md transition"
                  title="ลบรูปภาพ"
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <div className="w-full py-8 text-center text-gray-500 italic"></div>
          )}
        </div>
      </div>

      <div className="relative">
        <label
          htmlFor="file-upload"
          className="flex items-center justify-center gap-2 w-full py-4 px-4 rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 hover:bg-blue-100 transition cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-blue-600 font-medium">Select an image</span>
          <span className="text-blue-400 text-sm hidden sm:inline">
            (Multiple images to choose from)
          </span>
        </label>
        <input
          id="file-upload"
          type="file"
          name="images"
          onChange={handleOnChange}
          multiple
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      <p className="mt-2 text-xs text-gray-500">
        Supports JPG, PNG, GIF file types • File size up to 5MB
      </p>
    </div>
  );
};

export default UploadFile;
