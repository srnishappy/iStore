import { useEffect, useState } from 'react';
import { ListUser, ChangeUserStatus, ChangeUserRole } from '../../api/Admin';
import useEcomStore from '../../store/ecom-store';
import { toast } from 'react-toastify';
import { RefreshCw, Users, User, Shield, Circle, Tag } from 'lucide-react';

const ManageUser = () => {
  const token = useEcomStore((state) => state.token);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleGetUsers(token);
  }, []);

  const handleGetUsers = (token) => {
    ListUser(token)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangUserStatus = (id, status) => {
    const value = {
      id: id,
      enabled: !status,
    };

    ChangeUserStatus(token, value)
      .then((res) => {
        toast.success(`User status updated successfully`);
        handleGetUsers(token);
      })
      .catch((err) => {
        toast.error('Failed to update user status');
        console.log(err);
      });
  };

  const handleChangUserRole = (id, role) => {
    const value = {
      id: id,
      role: role,
    };

    ChangeUserRole(token, value)
      .then((res) => {
        toast.success(`User role updated to ${role}`);
        handleGetUsers(token);
      })
      .catch((err) => {
        toast.error('Failed to update user role');
        console.log(err);
      });
  };

  const getStatusStyle = (status) => {
    return status ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800';
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-center items-center mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0 flex items-center gap-2 text-center">
          Manage Users
        </h1>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-20">
          <Users size={64} className="mx-auto text-gray-400" />
          <p className="mt-4 text-xl text-gray-500">No users found</p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gradient-to-r from-gray-800 to-blue-700 text-white">
              <tr>
                <th className="py-4 px-6 text-left font-semibold rounded-tl-lg">
                  <div className="flex items-center gap-2">
                    <Tag size={16} />
                    ID
                  </div>
                </th>
                <th className="py-4 px-6 text-left font-semibold">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    User
                  </div>
                </th>
                <th className="py-4 px-6 text-left font-semibold">
                  <div className="flex items-center gap-2">
                    <Shield size={16} />
                    Role
                  </div>
                </th>
                <th className="py-4 px-6 text-left font-semibold">Status</th>
                <th className="py-4 px-6 text-left font-semibold rounded-tr-lg">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {users.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-blue-50 transition-all duration-200"
                >
                  <td className="py-4 px-6 font-medium">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {item.id}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
                        <span className="text-white font-medium">
                          {item.email[0].toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {item.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <select
                      value={item.role}
                      onChange={(e) =>
                        handleChangUserRole(item.id, e.target.value)
                      }
                      className="border border-gray-300 rounded-lg py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                        item.enabled
                      )}`}
                    >
                      {item.enabled ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-sm ${
                        item.enabled
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                      onClick={() =>
                        handleChangUserStatus(item.id, item.enabled)
                      }
                    >
                      {item.enabled ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUser;
