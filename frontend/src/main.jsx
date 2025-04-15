import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.jsx'
import store from './Redux/Store.jsx';
import { Provider } from 'react-redux';
import axios from 'axios';

// Configuration globale pour Axios
axios.defaults.baseURL = 'http://localhost:8000/api'; // Changez par votre URL backend
axios.defaults.withCredentials = true; // Active l'envoi des cookies

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
