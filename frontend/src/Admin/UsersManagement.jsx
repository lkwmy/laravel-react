import React, { useEffect, useState } from 'react'
import { fetchUsers } from './AuthServieAdmin';
import ModelEditUserOpen from './ModelEditUserOpen';
import EditUser from './EditUser';
import ModelAddUser from './ModelAddUser';
import AddUser from './AddUser';
import axios from 'axios';
import AutoLogout from './AutoLogout';

function UsersManagement() {
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [isModelAddUserOpen, setIsModelAddUserOpen] = useState(false);
const [isModelEditUserOpen, setIsModelEditUserOpen] = useState(false);
 const [editUserId, setEditUserId] = useState(null);

const deleteUser = async (userId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this user ? ");
  if (!confirmDelete) return ;
  try 
  {
    await axios.delete(`http://localhost:8000/api/users/${userId}`);
    setUsers(users.filter(user => user.id != userId));
    alert("user deleted succufully");
  }catch(error) {
    console.error("Error deleting user:", error);
    alert("An error occurred while deleting the user");
  }
};

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
        alert('Unable to get the data')
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
   <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AutoLogout/>
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
        Users Management
      </h2>

      <div className="flex justify-between items-center mb-6">
        <div className="space-x-4">
          <button
            onClick={() => setIsModelAddUserOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            Add User
          </button>
          
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            onClick={() => window.location.reload()}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr  className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.number}</td>
                 
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                     onClick={() => {
                      setEditUserId(user.id);
                      setIsModelEditUserOpen(true)}}
                      className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded-md hover:bg-indigo-100 transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-md hover:bg-red-100 transition-colors duration-200"
                      onClick={() => deleteUser(user.id)}                    
                    >
                      Delete
                    </button>
                  </td>
                </tr>
           ))}
            </tbody>
          </table>
        </div>
      </div>
<ModelAddUser isModelAddUserOpen={isModelAddUserOpen} setIsModelAddUserOpen={setIsModelAddUserOpen}>
  <div className='space-y-6'>
           <AddUser/>
  </div>
</ModelAddUser>
   
<ModelEditUserOpen isModelEditUserOpen={isModelEditUserOpen} setIsModelEditUserOpen={setIsModelEditUserOpen}>
<div className='space-y-6'> 
        <EditUser userId={editUserId}/>
        </div>
</ModelEditUserOpen>
      
    </div>
   </>
  )
}

export default UsersManagement