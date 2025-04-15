import axios from 'axios';
import React, { useState } from 'react'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {  toast } from 'react-toastify';

function Footer() {
  const [email, setEmail] = useState('');

  // Fonction pour envoyer l'email au backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche la soumission par défaut du formulaire
    if (!email) {
      toast.error(`Veuillez entrer un email valide`, {
        position: "top-right",  // Positionner le toast en haut à droite
        autoClose: 5000,        // Temps avant que le toast disparaisse (en ms)
        hideProgressBar: true,  // Cacher la barre de progression
        closeOnClick: true,     // Fermer le toast lorsque l'on clique dessus
        pauseOnHover: true,     // Mettre en pause quand l'utilisateur survole le toast
      });
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/store/email', { email });
      if (response.data.success) {
            toast.success(`Email ajouté avec succès !`, {
              position: "top-right",  // Positionner le toast en haut à droite
              autoClose: 1500,        // Temps avant que le toast disparaisse (en ms)
              hideProgressBar: true,  // Cacher la barre de progression
              closeOnClick: true,     // Fermer le toast lorsque l'on clique dessus
              pauseOnHover: true,     // Mettre en pause quand l'utilisateur survole le toast
            });
      } else {
        toast.error(`Veuillez entrer un email valide`, {
          position: "top-right",  // Positionner le toast en haut à droite
          autoClose: 1500,        // Temps avant que le toast disparaisse (en ms)
          hideProgressBar: true,  // Cacher la barre de progression
          closeOnClick: true,     // Fermer le toast lorsque l'on clique dessus
          pauseOnHover: true,     // Mettre en pause quand l'utilisateur survole le toast
        });
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error(`Veuillez entrer un email valide`, {
        position: "top-right",  // Positionner le toast en haut à droite
        autoClose: 1500,        // Temps avant que le toast disparaisse (en ms)
        hideProgressBar: true,  // Cacher la barre de progression
        closeOnClick: true,     // Fermer le toast lorsque l'on clique dessus
        pauseOnHover: true,     // Mettre en pause quand l'utilisateur survole le toast
      });
    }
  };
  return (
    <footer className='bg-gray-800 text-white py-8 px-4 md:px-16 lg:px:24'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div>
          <h3 className='text-xl font-semibold'> Casquetty</h3>
          <p className='mt-4'>Bienvenue dans notre boutique en ligne de casquettes !
🎩 Explorez notre collection exclusive de casquettes, alliant style, confort et qualité. Que vous soyez à la recherche de la dernière tendance ou d'une casquette classique pour compléter votre look, nous avons ce qu'il vous faut.
Notre objectif est de vous offrir une expérience de shopping facile, agréable et rapide.
Faites votre choix parmi nos modèles diversifiés et trouvez celle qui correspond parfaitement à votre style.
Bonne visite et bonnes emplettes ! 🧢🛒       
          </p>
        </div>
        <div className='flex flex-col md:items-center '>
          <h4 className='text-lg font-semibold'>Quick Links</h4>
          <ul className='mt-4 space-y-2'>
            <li>
              <Link to='/' className='hover:underline'>Home</Link>
            </li>
            <li>
              <Link to='/shop' className='hover:underline'>Shop</Link>
            </li>
            <li>
              <Link to='/contact' className='hover:underline'>Contact</Link>
            </li>
            <li>
              <Link to='/about' className='hover:underline'>About</Link>
            </li>
          </ul>
        </div>
        <div >
          <h4 className='text-xl font-semibold'>Follow Us</h4>
          <div className='flex space-x-4 mt-4'>
            <a href="" className='hover:text-grey-400'><FaFacebook/></a>
            <a href="" className='hover:text-grey-400'><FaInstagram/></a>
            <a href="" className='hover:text-grey-400'><FaGithub/></a>
            <a href="" className='hover:text-grey-400'><FaLinkedin/></a>
          </div>
          <form className='flex items-center justify-center mt-8' onSubmit={handleSubmit}>
            <input type='email' placeholder='Enter votre Email' value={email} onChange={(e) => setEmail(e.target.value)}
            className='w-full p-2 rounded-l-lg bg-grary-800 border border-gray-600 '/>
            <button type='submit' className='bg-red-600 text-white px-4 py-2 rounded-r-lg border border-gray-600'
             >S’inscrire</button>
          </form>
        </div> 
      </div>
      <div className='mt-8 border-t border-gray-700 pt-4'>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center '>
          <p>&copy; 2025 Casquetty All righs reserved.</p>
          <div className='flex space-x-6 mt-4 md:mt-0'>
            <a href="" className='hover:underline'>Privacy Policy</a>
            <a href="" className='hover:underline'>Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer