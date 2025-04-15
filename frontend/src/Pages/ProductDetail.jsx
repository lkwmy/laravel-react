import React, { useEffect, useState } from 'react'
import { FaCarSide, FaQuestion } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToCart } from '../Redux/CartSlice'
import { ToastContainer, toast } from 'react-toastify';

function ProductDetail() {
    const {id} = useParams() 
    const products = useSelector (state => state.product.products)
    const [product, setProduct] = useState ()
    useEffect(() => {
        const newProduct = products.find(product => product.id === parseInt(id))
      
        setProduct(newProduct);
    },[id, products]) 
    const dispatch = useDispatch();
    const handleAddToCart = (e,product) => {
        e.stopPropagation()
        e.preventDefault()
        dispatch(addToCart(product))
      toast.success(`Produit ajouté avec succès !`, {
            position: "top-right",  // Positionner le toast en haut à droite
            autoClose: 800,        // Temps avant que le toast disparaisse (en ms)
            hideProgressBar: true,  // Cacher la barre de progression
            closeOnClick: true,     // Fermer le toast lorsque l'on clique dessus
            pauseOnHover: true,     // Mettre en pause quand l'utilisateur survole le toast
          });
      }

    if (!product) return <div> Loading...</div>
  return (
    <div className='container mx-auto py-8 px-4 md:px-16 lg:px-24'>
      <div className='flex flex-col md:flex-row gap-x-16'>
        {/* product image */}
        <div className='md:w-1/2 py-4 shadow-md md:px-8 h-96 flex justify-center'>
          <img src={`http://localhost:8000/storage/${product.img1}`}  alt={product.name} className='h-full' />
        </div>
        {/* product information */}
        <div className='md:w-1/2 p-4 shadow-md md:p-16 flex flex-col items-center gap-y-2'>
            <h2 className='text-3xl font-semibold mb-2'>{product.name}</h2>
            <p className='text-xl font-semibold text-gray-800 mb-4'>
                  ${product.price}
            </p>
            <div className='flex items-center mb-4 gap-x-2'>
              {/* <label htmlFor="quantity" className='mr-2'>Quantity:</label> */}
              <input 
              type="number" 
              id='quantity'
              min="1"
              className='border p-1 w-16'
               />
               <button className='bg-red-600 text-white py-1.5 px-4 hover:bg-red-800'
               onClick={(e)=>handleAddToCart(e, product)}>
                Add to Cart
               </button>
            </div>
            <div className='flex flex-col gap-y-4 mt-4'>
              <p className='flex items-center'>
                <FaCarSide className='mr-1'/>
                Delivery & Return
              </p>
              <p className='flex items-center'>
                <FaQuestion className='mr-1'/>
                Ask a Question
              </p>
            </div>
        </div>
      </div>
      <div className='mt-8'>
        <h3 className='text-xl font-bold mb-2'> Product Description</h3>
        <p>Product description will goes here..........</p>
      </div>
     <ToastContainer />
    </div>
  )
}

export default ProductDetail