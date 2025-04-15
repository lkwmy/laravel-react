import React from 'react'
import { useNavigate } from 'react-router-dom'

function Order({order}) {
    const navigate = useNavigate()
  return (
    <div className='container mx-auto py-8 px-4 md:px-16 lg:px-24'>
        <h2 className='text-2xl font-semibold mb-4'>merci pour votre commande !</h2>
        <p>votre commande a été passée avec succès, vous recevrez un email de confirmation</p>
        <div className='mt-6 p-4 border rounded-lg bg-gray-100'>
            <h3 className='text-lg font-semibold mb-2'>récapitulatif de la commande</h3>
            <p>numéro de commande : {order.orderNumber}</p>
            <div className='mt-4'>
                <h4 className='text-md font-semibold mb-2'>informations d'expédition</h4>
                <p>{order.shippingInfo.address}</p>
                <p>{order.shippingInfo.city}</p>
                <p>{order.shippingInfo.zipcode}</p>
            </div>
            <div className='mt-4'>
                <h4 className='text-md font-semibold mb-2'>produits commandés</h4>
                {order.products.map(product => (
                    <div className='mt-4 flex justify-between' >
                        <p>{product.name} × ({product.quantity})</p>
                        <p>${product.price * product.quantity}</p>
                    </div>
                ))}
            </div>
            <div className='mt-4 flex justify-between'>
                <span>Prix Totale :</span>
                <span className='font-semibold'>${order.totalPrice.toFixed(2)}</span>
            </div>
            <div className='mt-6'>
                <button className='bg-green-500 text-white py-2 px-4 hover:bg-green-600'>
                    suivi des commandes
                    </button>
                <button className='ml-4 bg-red-600 text-white py-2 px-4 hover:bg-red-800'
                onClick={() => navigate('/')}>
                    continuer mes achats
                    </button>
            </div>
        </div>
    </div>
  )
}

export default Order