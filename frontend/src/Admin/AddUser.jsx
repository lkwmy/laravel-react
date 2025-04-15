import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { addUser } from './AuthServieAdmin';


function AddUser() { 

  const [formDataUser, setFormDataUser] = useState({

    name:"",
    email:"",
    number:"",
    password:"",
    role:""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const handleSubmit = async  (e) => {
     // Empêche le comportement par défaut du formulaire (rechargement de la page)
     e.preventDefault();
     console.log(formDataUser);
    const {success, message} = await  addUser(formDataUser);

    if (success){
      setMessage("User added successfully!");
    } else {
      setMessage( message ||"Failed to add user. Please try again.")
    }

  }
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <div className="mb-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Add User 
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Fill in the user details below
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
            </div>
            <div className="sm:col-span-4">
              <input
                type="text"
                name="name"
                id="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter user name"
                value={formDataUser.name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                Email
              </label>
            </div>
            <div className="sm:col-span-4">
              <input
                type="email"
                name="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter user email"
                value={formDataUser.email}
                onChange={handleChange}
              />
            </div>
          </div>

             {/* Number Field */}
             <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                Number
              </label>
            </div>
            <div className="sm:col-span-4">
              <input
                type="number"
                name="number"
                id="number"
                className="mt-1 block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="0685971354"
               value={formDataUser.number}
               onChange={handleChange}
              />
            </div>
          </div> 
          {/* password field */}
          <div className="mb-4">
          <label className="block text-gray-700">Mot de Passe</label>
          <input
            type="password"
             name="password"
            className="w-full px-3 py-2 border"
            placeholder="Entrez votre mot de passe"
            value={formDataUser.password} 
            onChange={handleChange}
          />
        </div>

          {/* Role Field */}
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
            </div>
            <div className="sm:col-span-4">
              <select
                name="role"
                id="role"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={formDataUser.role}
                onChange={handleChange}
              >
                 <option value="0">Client</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

        {/* Submit Buttons */}
          <div className="pt-5">
            <div className="flex justify-end space-x-3">
              <a
                href="/dashboard/admin/addUser"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </a>
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add User
              </button>
            </div>
          </div>
        </form>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </div>
    </div>
  </div>
  )
}

export default AddUser