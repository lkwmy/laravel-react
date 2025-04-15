import axios from 'axios';
import React, { useState } from 'react'
import {  toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
function Contact() {

    const [email, setEmail] = useState('');
    const [object, setObject] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleMessageChange = (e) => {
        const newMessage = e.target.value;
        const wordCount = newMessage.trim().split(/\s+/).length;
    
        if (wordCount <= 100) {
          setMessage(newMessage);
          setError(''); // Clear error message if word count is within the limit
        } else {
          setError('Le message ne doit pas dépasser 100 mots.');
        }
      };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (error) {
        // Ne soumettez pas si une erreur est présente
        return;
      }
  
      setIsSubmitting(true); // Indiquer que la soumission est en cours
  
      // Vous pouvez envoyer les données à une API ici
      try {
        const response = await axios.post('http://localhost:8000/api/message', {
          email,
          object,
          message
        });
  
        if (response.data.success) {
              toast.success(`Votre message a été envoyé avec succès !`, {
                        position: "top-right",  // Positionner le toast en haut à droite
                        autoClose: 1500,        // Temps avant que le toast disparaisse (en ms)
                        hideProgressBar: true,  // Cacher la barre de progression
                        closeOnClick: true,     // Fermer le toast lorsque l'on clique dessus
                        pauseOnHover: true,     // Mettre en pause quand l'utilisateur survole le toast
                      });
          // Réinitialiser les champs après soumission
          setEmail('');
          setObject('');
          setMessage('');
        } else {
            toast.error(`Erreur lors de l\'envoi du message. Veuillez réessayer.`, {
                    position: "top-right",  // Positionner le toast en haut à droite
                    autoClose: 1500,        // Temps avant que le toast disparaisse (en ms)
                    hideProgressBar: true,  // Cacher la barre de progression
                    closeOnClick: true,     // Fermer le toast lorsque l'on clique dessus
                    pauseOnHover: true,     // Mettre en pause quand l'utilisateur survole le toast
                  });
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoi du message:', error);
        toast.error(`Une erreur est survenue. Veuillez réessayer.`, {
            position: "top-right",  // Positionner le toast en haut à droite
            autoClose: 1500,        // Temps avant que le toast disparaisse (en ms)
            hideProgressBar: true,  // Cacher la barre de progression
            closeOnClick: true,     // Fermer le toast lorsque l'on clique dessus
            pauseOnHover: true,     // Mettre en pause quand l'utilisateur survole le toast
          });
        
      } finally {
        setIsSubmitting(false); // Terminer la soumission
      }
    };
  
    
  return (
    <div>
    
 <form class="max-w-sm mx-auto" onSubmit={handleSubmit}>
<div className="mb-5">
    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-10">Votre email</label>
    <input type="email" id="email" value={email} 
    onChange={(e) => setEmail(e.target.value)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" required />
      <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Objet
      </label>
      <input 
        type="text" 
        id="base-input" 
        value={object}
        onChange={(e) => setObject(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <div>
  <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre message</label>
  <textarea id="message" rows="4" value={message} onChange={handleMessageChange} 
  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Laisser un message..."></textarea>
  {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
  <button type="submit" 
 disabled={isSubmitting} // Empêche la soumission multiple pendant le processus
  className="text-white bg-sky-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4 mb-10"> {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}</button>
</form> 
<ToastContainer />
</div>
    
  )
}

export default Contact