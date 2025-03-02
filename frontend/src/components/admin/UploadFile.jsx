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
        toast.success(`🗑️ ลบรูปสำเร็จ!`);
      })
      .catch((err) => {
        toast.error(`❌ ลบรูปไม่สำเร็จ!`);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="my-4">
      {uploading && <p className="text-blue-500">⏳ กำลังอัปโหลดรูป...</p>}
      <div className="flex mx-4 gap-4 my-4">
        {form.images.map((item, index) => (
          <div key={index} className="relative inline-block">
            <img
              src={item.url}
              className="w-30 h-30 object-cover shadow-lg rounded-lg"
              alt={`image-${index}`}
            />
            <span
              onClick={() => handleRemove(item.public_id)}
              className="absolute top-0 right-0 bg-red-600 text-white w-5 h-5 flex items-center justify-center rounded-full cursor-pointer hover:scale-110 transition"
            >
              ×
            </span>
          </div>
        ))}
      </div>
      <div>
        <input
          type="file"
          name="images"
          onChange={handleOnChange}
          multiple
          accept="image/*"
          className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 transition"
        />
      </div>
    </div>
  );
};

export default UploadFile;
