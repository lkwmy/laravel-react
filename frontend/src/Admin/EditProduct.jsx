import React, { useEffect, useState } from "react";
import {  updateProduct } from "./AuthServieAdmin";
import { useNavigate } from "react-router-dom";

function EditProduct({ productId }) {

  useEffect(() => {
    // Utilisez `productId` pour récupérer les données du produit à éditer
    console.log("Product ID to edit:", productId);
    // Vous pouvez faire un appel API pour récupérer les données du produit avec cet ID
  }, [productId])

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    quantity: "",
    price: "",
    description: "",
  });
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]); // État local images pour stocker les fichiers image téléchargés par l'utilisateur.
  const navigate = useNavigate();

// Gestionnaire d'événements pour mettre à jour les données textuelles saisies par l'utilisateur.
  const handleChange = (e) => {
    // Extraction du nom et de la valeur du champ qui a déclenché l'événement.
    const { name, value } = e.target;
    // Mise à jour de la clé correspondant au champ modifié dans formData.
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
// Gestionnaire d'événements pour gérer les images sélectionnées par l'utilisateur
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Conversion des fichiers téléchargés en un tableau.
    // Vérifiez que l'utilisateur ne télécharge pas plus de 5 images
    if (files.length + images.length > 5) {
      setMessage("You can upload up to 5 images only."); // Affiche un message d'erreur si la limite est dépassée.
      return;
    }

    // Ajoutez les nouvelles images à l'état
    setImages((prevImages) => [...prevImages, ...files]);
  };
// Gestionnaire pour supprimer une image spécifique de la liste.
  const handleImageRemove = (index) => {
    // Filtre les images pour retirer celle correspondant à l'index spécifié.
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
// Gestionnaire pour soumettre le formulaire.
  const handleSubmit = async (e) => {
    // Empêche le comportement par défaut du formulaire (rechargement de la page)
    e.preventDefault();

    // Création d'un objet FormData pour envoyer des données multipart/form-data.
    const productData = new FormData();
  
    productData.append("name", formData.name); // Ajout du nom du produit au FormData.
    productData.append("brand", formData.brand); // Ajout de la marque au FormData.
    productData.append("quantity", formData.quantity);  // Ajout de la catégorie au FormData.
    productData.append("price", formData.price);   // Ajout du prix au FormData.
    productData.append("description", formData.description); // Ajout de la description au FormData.

    // Boucle sur chaque image pour l'ajouter au FormData
    images.forEach((image, index) => {
      // Ajout de l'image au FormData avec un nom unique basé sur l'index.
      productData.append(`images[${index}]`, image);
    });
// Appel de la fonction addProduct pour envoyer les données au serveur.
// La réponse contient un statut de succès et un message.
    const { success, message } = await updateProduct(productData);
    // Mise à jour du message en fonction de la réponse du serveur
    setMessage(message);
    // Si le produit est ajouté avec succès 
    if (success) {
      // Réinitialise les champs du formulaire.
      setFormData({
        name: "",
        brand: "",
        quantity: "",
        price: "",
        description: "",
      });
      setImages([]); // Réinitialise la liste des images téléchargées.
      setMessage("Product edited successfully!"); // Affiche un message de succès.
      navigate("/dashboard/admin/product");  // Redirige l'utilisateur vers une autre page.
    } else {
      setMessage("Failed to edit product"); // Affiche un message d'échec en cas de problème
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <div className="mb-8">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Edit Product : {productId}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Fill in the product details below
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
              </div>
              <div className="sm:col-span-4">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Brand Field */}
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                  Brand
                </label>
              </div>
              <div className="sm:col-span-4">
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Enter brand name"
                  value={formData.brand}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Quantity Field */}
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Quantity
                </label>
              </div>
              <div className="sm:col-span-4">
                <select
                  name="quantity"
                  id="quantity"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={formData.quantity}
                  onChange={handleChange}
                >
                  
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  
                </select>
              </div>
            </div>

            {/* Price Field */}
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
              </div>
              <div className="sm:col-span-4">
                <input
                  type="number"
                  name="price"
                  id="price"
                  step="0.01"
                  min="1"
                  className="mt-1 block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Description Field */}
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
              </div>
              <div className="sm:col-span-4">
                <textarea
                  name="description"
                  id="description"
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            {/* Upload Images */}
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                  Upload Images (max 5)
                </label>
              </div>
              <div className="sm:col-span-4">
                <input
                  id="file-upload"
                  name="images"
                  type="file"
                  multiple
                  className="block w-full text-sm text-gray-500"
                  onChange={handleImageChange}
                />
                <p className="mt-2 text-sm text-gray-500">You can upload up to 5 images.</p>
              </div>
            </div>

         {/* Image Preview */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
  {images.map((image, index) => (
    <div 
      key={index} 
      className="relative group transition-all duration-300 hover:shadow-lg rounded-lg overflow-hidden"
    >
      <img
        src={URL.createObjectURL(image)}
        alt={`preview-${index}`}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <button
        type="button"
        onClick={() => handleImageRemove(index)}
        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white w-8 h-8 
                 rounded-full flex items-center justify-center transition-colors duration-200 
                 opacity-0 group-hover:opacity-100 shadow-md"
      >
        <span className="sr-only">Remove image</span>
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M6 18L18 6M6 6l12 12" 
          />
        </svg>
      </button>
    </div>
  ))}
</div>
            {/* Submit Buttons */}
            <div className="pt-5">
              <div className="flex justify-end space-x-3">
                <a
                  href="/dashboard/admin/product"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </a>
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={images.length > 5} // Désactive le bouton si plus de 5 images
                >
                  Update Product
                </button>
              </div>
            </div>
          </form>
          {message && <p className="mt-4 text-green-500">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
