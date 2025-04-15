import axios from 'axios';

// Configuration globale pour Axios
axios.defaults.baseURL = 'http://localhost:8000/api'; // Changez par votre URL backend
axios.defaults.withCredentials = true; // Active l'envoi des cookies

export default axios;
