import React, { useEffect, useState } from 'react'
import { fetchProducts } from './AuthServieAdmin';
import  ModalEdit from './ModalEdit';
import CreateProduct from './CreateProduct';
import ModalAddProduct from './ModalAddProduct';
import EditProduct from './EditProduct';
import axios from 'axios';
import AutoLogout from './AutoLogout';


function ProductsManagement() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isModelAddProduct, setIsModelAddProduct] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

const deleteProduct = async (productId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this product ? ");
  if (!confirmDelete) return ;
  try 
  {
    await axios.delete(`http://localhost:8000/api/products/${productId}`);
    setProducts(products.filter(product => product.id != productId));
    alert ("Product deleted successfully.");
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("An error occurred while deleting the product");
  }
};

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
        alert('Unable to get the data')
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AutoLogout/>
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
      Gestion des produits
      </h2>

      <div className="flex justify-between items-center mb-6">
        <div className="space-x-4">
          <button
             onClick={() => setIsModelAddProduct(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            Créer un produit
          </button>
          
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            onClick={() => window.location.reload()}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Rafraîchir
          </button>
        </div>
      </div>

      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marque</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantité</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Créé à</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.brand}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${product.price}</td>
                  {/* <td >Image</td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.created_at.slice(0, 10)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => {
                        setEditProductId(product.id); // Sauvegarder l'ID du produit pour l'édition
                         setIsModelOpen(true)
                              }}
                      className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded-md hover:bg-indigo-100 transition-colors duration-200"

                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-md hover:bg-red-100 transition-colors duration-200"
                      onClick={()=> deleteProduct(product.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalEdit isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}>
        <EditProduct  productId={editProductId}/> {/* Passez l'ID du produit à éditer */}
      </ModalEdit>

      <ModalAddProduct isModelAddProduct={isModelAddProduct} setIsModelAddProduct={setIsModelAddProduct}>
        <div className='space-y-6'> 
        <CreateProduct/>
        </div>       
      </ModalAddProduct>
    </div>
  )
}

export default ProductsManagement
