import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const LoadingToRedirect = () => {
  const [count, setCount] = useState(3);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 1) {
          clearInterval(interval);
          setRedirect(true);
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold text-red-500 mb-4">
          You are not an admin, you do not have access to this page.
        </h2>
        <p className="text-lg text-gray-700">
          Redirecting in {count} seconds...
        </p>
        <div className="mt-4">
          <svg
            className="animate-spin h-6 w-6 text-blue-500 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              fill="currentColor"
              d="M4 12c0 4.418 3.582 8 8 8s8-3.582 8-8H4z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LoadingToRedirect;
