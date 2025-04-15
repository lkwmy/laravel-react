import axios from './Axios.jsx'





// L'URL de l'API Laravel (remplacez-la par l'URL correcte de votre backend)
const API_URL = 'http://localhost:8000/api';  // Remplacez par l'URL de votre API


// Fonction d'inscription
export const registerUser = async (name, email, password, number, password_confirmation) => {
  try {
    // Envoi de la requête d'inscription
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
      number,
      password_confirmation,
    });

    // Si l'inscription réussit, vous pouvez envoyer un message de succès
    return { success: true, message: 'User registered successfully' };
    
  } catch (error) {
    console.error('Error registering user:', error);
    return { success: false, message: error.response?.data?.message || 'Registration failed' };
  }
};

// Fonction de login
export const loginUser = async (email, password) => {
  try 
    { 
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email, password }),
      });
      if (response.data.success) {
        // Utilisateur admin
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
         alert('Admin login successful');
        // Rediriger vers le tableau de bord admin
        window.location.href = '/dashboard/admin'; 
    } else if (response.data.token) {
        // Utilisateur non admin
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        alert('Login successful as a Client');
        // Rediriger vers le tableau de bord client
        window.location.href = '/'; 
    } else {
        // Utilisateur non enregistré ou informations incorrectes
        alert(response.data.message);
    }
  } catch(error) {
    console.error('Login failed', error);
    alert('Login failed');
  }

};


  


  export const logoutUser = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout', {}, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
      });

      localStorage.removeItem('token'); // Supprimer le token
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization']; // Supprimer le token des en-têtes
  } catch (error) {
      console.error('Logout failed:', error.response.data);
  }
  }; 


  // admin 
export const registerAdmin = async (name, email, password) => {
  // Envoi de la requête d'inscription
  try {
    const response = await axios.post(`${API_URL}/admin/register`, {
      name, 
      email, 
      password,
    });
     // Si l'inscription réussit, vous pouvez envoyer un message de succès
     return { success: true, message: 'User registered successfully' };
  } catch(error){
    console.error('Error registering user:', error);
    return { success: false, message: error.response?.data?.message || 'Registration failed' };
  }
};

export const loginAdmin = async (email, password) => {

  try {
    const response = await axios.post(`${API_URL}/admin/login`, {
      email: email,
      password: password,
    },{ withCredentials: true });
    console.log('Réponse de l\'API:', response.data);
    
     // Si la connexion réussie, stocker le token et les données utilisateur dans le localStorage
     localStorage.setItem('token', response.data.token);
     localStorage.setItem('user', JSON.stringify(response.data.user));
          // Rediriger ou afficher un message de bienvenue
          console.log('Utilisateur connecté:', response.data.user);
    // Stocke le token d'accès pour une utilisation future
  //   localStorage.setItem('access_token', response.data.access_token);
  //   const token = response.data.access_token; 
  //  console.log(token);
     window.location.href = '/dashboard/admin';
  } catch (error) {
    console.error('Erreur lors de la connexion:', error.response.data);
  }
};
 

