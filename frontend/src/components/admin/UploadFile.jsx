import { useState } from 'react';
import { toast } from 'react-toastify';
import Resize from 'react-image-file-resizer';
import { uploadFiles } from '../../api/Product';
import useEcomStore from '../../store/ecom-store';
const UploadFile = ({ form, setForm }) => {
  const [loading, setLoading] = useState(false);
  const token = useEcomStore((state) => state.token);
  const handleOnChange = (e) => {
    const files = e.target.files;
    if (files) {
      setLoading(true);
      let allFiles = form.images;
      for (let i = 0; i < files.length; i++) {
        console.log(files[i]);
        const file = files[i];
        if (!file.type.startsWith('image/')) {
          toast.error(`File ${file.name} is not an image!`);
          continue;
        }
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (data) => {
            uploadFiles(token, data)
              .then((res) => {
                console.log(res);
                allFiles.push(res.data);
                setForm({
                  ...form,
                  images: allFiles,
                });
                toast.success(`Upload image Sucessfully!`);
              })
              .catch((err) => {
                console.log(err);
              });
          },
          'base64'
        );
      }
    }

    console.log(files);
  };
  return (
    <div>
      <input type="file" name="images" onChange={handleOnChange} multiple />
    </div>
  );
};
export default UploadFile;
