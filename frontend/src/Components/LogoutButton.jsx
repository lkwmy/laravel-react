import React from 'react';
import axios from 'axios';

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Envoyer le token dans le header
                },
            });

            if (response.data.success) {
                // Supprimer le token du localStorage
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                alert('Logged out successfully');
                // Rediriger vers la page de connexion ou la page d'accueil
                window.location.href = '/';
            } else {
                alert('Logout failed');
            }
        } catch (error) {
            console.error('Logout failed', error);
            alert('Logout failed');
        }
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;