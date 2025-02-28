import { useEffect, useState } from 'react';
import useEcomStore from '../store/ecom-store';
import { currentUser } from '../api/Auth';
import LoadingToRedirect from '../routes/LoadingToRedirect';

const ProtectRouteUser = ({ element }) => {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true); // เพิ่มตัวแปร loading
  const user = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);

  useEffect(() => {
    if (user && token) {
      currentUser(token)
        .then((res) => {
          setOk(true);
          setLoading(false); // อัพเดตสถานะเป็น false เมื่อโหลดเสร็จ
        })
        .catch((err) => {
          setOk(false);
          setLoading(false); // อัพเดตสถานะเป็น false เมื่อโหลดเสร็จ
        });
    } else {
      setLoading(false); // หากไม่มี user หรือ token ให้ตั้งสถานะ loading เป็น false
    }
  }, [user, token]);

  if (loading) {
    return <div>Loading...</div>; // แสดงข้อความหรือ spinner ในระหว่างที่กำลังโหลด
  }

  return ok ? element : <LoadingToRedirect />;
};

export default ProtectRouteUser;
