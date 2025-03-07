import { Outlet } from 'react-router-dom';
import MainNav from '../../components/MainNav';
import Footer from '../user/Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-grow px-4 mt-2 mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
