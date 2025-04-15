import React from 'react'
import { FaStar } from 'react-icons/fa'
import { addToCart } from '../Redux/CartSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {  toast } from 'react-toastify';
  

function ProductCard({ product }) {

  const dispatch = useDispatch();
  const handleAddToCart = (e,product) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(addToCart(product))
  
// Convertir le prix en nombre
const price = Number(product.price);
    toast.success(`Product Added Succesfully!`, {
      position: "top-right",  // Positionner le toast en haut à droite
      autoClose: 500,        // Temps avant que le toast disparaisse (en ms)
      hideProgressBar: true,  // Cacher la barre de progression
      closeOnClick: true,     // Fermer le toast lorsque l'on clique dessus
      pauseOnHover: true,     // Mettre en pause quand l'utilisateur survole le toast
    });
    
  }
  return ( 
    <Link to={`/product/${product.id}`}>
    <div className="bg-white p-4 shadow rounded relative border 
    transform transition-transform duration-300 hover:scale-105" >
      <img src={`http://localhost:8000/storage/${product.img1}`}   alt={product.name} className="w-full h-48 object-contain mb-4"/>
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-500">${product.price}</p>
      <div className="flex items-center mt-2">
             <FaStar className='text-yellow-500'/>
             <FaStar className='text-yellow-500'/>
             <FaStar className='text-yellow-500'/>
             <FaStar className='text-yellow-500'/>
             <FaStar className='text-yellow-500'/>
      </div>
      <div
        className="absolute bottom-4 right-2 flex items-center justify-center w-8 h-8 bg-red-600
        group text-white text-sm rounded-full hover:w-32 hover:bg-red-700 transition-all"
        onClick={(e)=>handleAddToCart(e, product)} >
        <span className="group-hover:hidden">+</span>
        <span className="hidden group-hover:block">Add to Cart</span>
      </div>
    </div>
    </Link>
  );
}

export default ProductCard;













