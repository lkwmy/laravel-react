import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AutoLogout from './AutoLogout';


function MessagerieMangement() {

  
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

   // Fonction pour récupérer les messages depuis l'API Laravel
   useEffect(() => {
    axios
      .get('http://localhost:8000/api/messages') // Remplacez par l'URL de votre API Laravel
      .then((response) => {
        setMessages(response.data); // Stocke les données dans le state
      })
      .catch((err) => {
        setError('Erreur lors de la récupération des messages');
        console.error(err);
      });
  }, []);

    // État pour gérer l'affichage du texte complet
    const [activeCard, setActiveCard] = useState(null);

    // Fonction pour basculer entre afficher et masquer le texte complet
    const handleCardClick = (id) => {
      if (activeCard === id) {
        setActiveCard(null); // Si la carte est déjà ouverte, on la ferme
      } else {
        setActiveCard(id); // Sinon, on ouvre la carte sélectionnée
      }
    };
  
 
  return (  
<div className="container mx-auto p-6">
<AutoLogout/>
{error && <p className="text-red-500 text-center">{error}</p>}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Afficher chaque message dans une carte */}
  {messages.length > 0 ? (
    messages.map((message) => (
      <div key={message.id} className="max-w-sm mx-auto">
        <a
          href="#"
          className="block p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition-all ease-in-out"
        >
          {/* Affichage de l'email */}
          <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white overflow-hidden text-ellipsis whitespace-nowrap">
            {message.email}
          </h5>

          {/* Affichage de l'objet */}
          <p className="font-normal text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
            {message.object}
          </p>

          {/* Affichage du message */}
          <p className="font-normal text-gray-700 dark:text-gray-400 mt-2 overflow-hidden text-ellipsis">
            {message.message}
          </p>
        </a>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500">Aucun message disponible.</p>
  )}
</div>
</div>
  )
}

export default MessagerieMangement