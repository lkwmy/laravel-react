import React from 'react';
import axios from 'axios';
import {  Link, Outlet,  useNavigate } from 'react-router-dom';
import SideBar from './SideBar';




 
function DashboardAdmin() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token'); // Récupération du token
      const response = await axios.post(
        'http://localhost:8000/api/logout', // Remplacez par l'URL de votre API
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ajouter le token dans les en-têtes
          },
        }
      );

      if (response.data.success) {
        console.log('Logout success:', response.data.message);
        localStorage.removeItem('token'); // Supprimez le token local
        localStorage.removeItem('user'); // Supprimez les infos utilisateur
        navigate('/'); // Redirigez vers la page de connexion
      } else {
        console.error('Logout failed:', response.data.message);
      }
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };
   
    return (
    <>
    {/* <button onClick={handleLogout}>logout</button> */}

        <div className="flex h-screen bg-gray-100">
        <SideBar/>
        <div className="flex-1 p-8">
        <Outlet /> {/* Affiche le contenu des routes enfants ici */}
      </div>
        </div>


    
    </>
    );
  };

  

export default DashboardAdmin;
