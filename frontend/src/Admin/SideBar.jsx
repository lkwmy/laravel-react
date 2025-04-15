import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


function SideBar() {

  const navigate = useNavigate();
  const handleLogout = () =>{
     // Supprimer le token et les données de l'utilisateur dans le localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };
  return (

   
        <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">Admin Dashboard</h2>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/dashboard/admin/home" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
              Accueil
              </Link>
            </li>
            <li>
              <Link to="/dashboard/admin/messagerie" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
              Messagerie
              </Link>
            </li>
            <li>
            <Link to="/dashboard/admin/users" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
            Utilisateurs
              </Link>
            </li>
            <li>
            <Link to="/dashboard/admin/product" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
            Produits
              </Link>
            </li>
            <li>
              <button className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    
  )
}

export default SideBar