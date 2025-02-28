import { Outlet } from 'react-router-dom';

const LayoutAdmin = () => {
  return (
    <div>
      <h1>Sidebar</h1>
      <h1>Header</h1>
      <Outlet />
    </div>
  );
};
export default LayoutAdmin;
