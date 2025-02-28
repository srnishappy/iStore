import { Link } from 'react-router-dom';

const MainNav = () => {
  return (
    <nav className="bg-gray-800 text-amber-50 ">
      <div className="mx-auto px-6">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to={'/'}>LOGO</Link>
            <Link to={'/'}>Home</Link>
            <Link to={'shop'}>Shop</Link>
            <Link to={'cart'}>Cart</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to={'/register'}>Register</Link>
            <Link to={'/login'}>Login</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default MainNav;
