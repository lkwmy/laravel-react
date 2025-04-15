import axios from "axios";




const API_URL = 'http://localhost:8000/api';

export const fetchProducts = async() => {

    try 
    {
       const response = await axios.get(`${API_URL}/products`);
       return response.data; // Retourne la liste des produits
    } catch (error) {
        console.log('error lors de le récupération des produits:', error);
        throw error; // gérer l'erreur dans le composant
    }
};


export const addProduct = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return {
        success: true,
        message: response.data.message || "Product added successfully!",
      };
    } catch (error) {
      console.error("Error adding product:", error);
      return {
        success: false,
        message: "Failed to add product. Please try again.",
      };
    }
};

export const updateProduct = async (formData, productId) => {
  try {
    const response = await axios.put(`${API_URL}/products/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      success: true,
      message: response.data.message || "Product updated successfully!",
    };
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      success: false,
      message: "Failed to updating product. Please try again.",
    };
  }
};
// afficher les users 
export const fetchUsers = async() => {
  try 
    {
       const response = await axios.get(`${API_URL}/users`);
       return response.data; // Retourne la liste des utilisateurs
    } catch (error) {
        console.log('error lors de le récupération des produits:', error);
        throw error; // gérer l'erreur dans le composant
    }
};
export const addUser = async(formDataUser) => {
    try 
    {
      const response = await axios.post(`${API_URL}/register/admin`, formDataUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log('API response:', response); // Ajoutez ceci pour voir la réponse
      return response.data; // Retourne les données de la réponse (success, message, etc.)
    } catch(error) {
      console.error('Error in addUser API call :', error);
      return {
        success: false,
        message:"An error occurred while adding user. Please try later."
      }
    }
};

export const updateUser = async (formDataUser, userId) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, formDataUser, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      success: true,
      message: response.data.message || "User updated successfully!",
    };
  } catch (error) {
    console.error("Error updating user:", error);
    console.error("Error response:", error.response)
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update user. Please try again.",
    };
  }
};
 export const api = axios.create({
  baseURL: 'http://localhost:8000/api', // URL de votre backend Laravel
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Récupère le token stocké
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.get('/protected-route')
  .then((response) =>{
    console.log(response.data);
  })
  .catch((error) =>{
    console.error(error.response.data);
  });