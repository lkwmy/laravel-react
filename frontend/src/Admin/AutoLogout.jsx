import React, { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';

const AutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Fonction qui sera appelée après 2 minutes d'inactivité
    const logoutAfterInactivity = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/'); // Rediriger vers la page de login après la déconnexion
    };

    let inactivityTimer;

    // Réinitialiser le timer à chaque activité de l'utilisateur
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(logoutAfterInactivity, 2 * 60 * 1000); // 2 minutes
    };

    // Écouter les événements d'activité
    const events = ['mousemove', 'keydown', 'scroll', 'click'];

    events.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer);
    });

    // Définir un timer initial pour la première détection
    inactivityTimer = setTimeout(logoutAfterInactivity, 2 * 60 * 1000);

    // Nettoyer les événements et les timers quand le composant est démonté
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimer);
      });
      clearTimeout(inactivityTimer);
    };
  }, [history]);

  return null; // Ce composant ne rend rien, il est juste pour gérer l'inactivité
};

export default AutoLogout;
