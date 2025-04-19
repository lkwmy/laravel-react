import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Checkout({setOrder}) {
    const [billingToggle, setBillingToggle] = useState(true)
    const [shippingToggle, setShippingToggle] = useState(false)
    const [paymentToggle, setPaymentToggle] = useState(false) 
    const [paymentMethode, setPaymentMethode] = useState("cartecredit")
    const [shippingInformation, setShippingInformation] = useState({
        address :'',
        city : '',
        zipcode : '',
    })

    const cart = useSelector(state => state.cart)
    const navigate = useNavigate()
    const handleOrder = () => {
        const newOrder = {
            products : cart.products,
            orderNumber : '11111',
            shippingInfo : shippingInformation,
            totalPrice: cart.totalPrice
        }
        setOrder(newOrder)
        navigate('/order-confirmation')
    }
  return (
    <div className='contanier mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24'>
        <h3 className='text-2xl font-semibold mb-4'>VÉRIFIER </h3>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-x-0 md:space-x-10 space-y-4 md:space-y-0 mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
            <div className="md:w-2/3 w-full p-4 bg-white rounded-lg shadow-md border border-gray-200">
               <div className="border border-gray-300 p-4 mb-6 rounded-lg shadow-sm bg-gray-50">
                    <div className='flex items-center justify-between'
                    onClick={() => setBillingToggle(!billingToggle)}>
                        <h3 className='text-lg font-semibold mb-2'>Informations de Facturation</h3>
                            {billingToggle ? <FaAngleDown/> : <FaAngleUp/> }
                    </div>
                    <div className={`space-y-4 ${billingToggle ? "" : "hidden"}` }>
                        <div>
                            <label htmlFor="" className='block text-gray-700'>Nom</label>
                            <input type="text"
                            placeholder='Entez Nom'
                            name='name'
                            className='w-full px-3 py-2 border rounded-lg ' />
                        </div>
                   
                        <div>
                            <label htmlFor="" className='block text-gray-700'>Email</label>
                            <input type="email"
                            placeholder='Entrez email'
                            name='email'
                            className='w-full px-3 py-2 border rounded-lg' />
                        </div>
                        <div>
                            <label htmlFor="" className='block text-gray-700'>Téléphone</label>
                            <input type="text" 
                            placeholder='Entrez le numéro de téléphone'
                            name='phone'
                            className='w-full px-3 py-2 border rounded-lg'/>
                        </div> 
                        </div>
               </div>
               {/* shipping Information */}
               <div className="border border-gray-300 p-4 mb-6 rounded-lg shadow-sm bg-gray-50">
                    <div className='flex items-center justify-between'
                    onClick={() => setShippingToggle(!shippingToggle)}>
                        <h3 className='text-lg font-semibold mb-2'>Informations d'Expédition</h3>
                            {shippingToggle ? <FaAngleDown/> : <FaAngleUp/> }
                    </div>
                    <div className={`space-y-4 ${shippingToggle ? "" : "hidden"}` }>
                        <div>
                            <label htmlFor="" className='block text-gray-700'>Adresse</label>
                            <input type="text"
                            placeholder='76, rue chemin vert '
                            name='address'
                            className='w-full px-3 py-2 border rounded-lg '
                            onChange={(e) => setShippingInformation({...shippingInformation, address: e.target.value})} />
                        </div>
                   
                        <div>
                            <label htmlFor="" className='block text-gray-700'>Ville</label>
                            <input type="text"
                            placeholder='Paris'
                            name='city'
                            className='w-full px-3 py-2 border rounded-lg'
                            onChange={(e) => setShippingInformation({...shippingInformation, city: e.target.value})} />
                        </div>
                        <div>
                            <label htmlFor="" className='block text-gray-700'>Code Postal</label>
                            <input type="text" 
                            placeholder='75020...'
                            name='zipcode'
                            className='w-full px-3 py-2 border rounded-lg'
                            onChange={(e) => setShippingInformation({...shippingInformation, zipcode: e.target.value})}/>
                        </div> 
                        </div>
              </div>
              {/* methode de paiement  */}
              <div className="border border-gray-300 p-4 mb-6 rounded-lg shadow-sm bg-gray-50">
                    <div className='flex items-center justify-between'
                    onClick={() => setPaymentToggle(!paymentToggle)}>
                        <h3 className='text-lg font-semibold mb-2'>Mode de Paiement</h3>
                            {paymentToggle ? <FaAngleDown/> : <FaAngleUp/> }
                    </div>
                    <div className={`space-y-4 ${paymentToggle ? "" : "hidden"}` }>
                        <div className='flex items-center mb-2'>
                            <input type="radio"
                            name='payment'
                             checked = {paymentMethode === "cartecredit"}
                             onChange={() => setPaymentMethode("cartecredit")} />
                            <label htmlFor="" className='block text-gray-700 ml-2'>Cartes de Crédit</label>
                        </div>
                        {paymentMethode === "cartecredit" && (
                            <div className='bg-gray-100 p-4 rounded-lg mb-4'>
                                <h3 className='text-xl font-semibold mb-4'>
                                    Carte de Crédit</h3>
                                <div className='mb-4'>
                                    <label className='block text-gray-700 font-semibold mb-2'>
                                        Numéro de la Carte</label>
                                    <input 
                                     type="text"
                                      placeholder='Entrez le numéro de la carte ' 
                                      className='border p-2 w-full rounded' 
                                      required/>
                                </div>
                                <div className='mb-4'>
                                    <label className='block text-gray-700 font-semibold mb-2'>
                                        Nom du titulaire de la carte</label>
                                    <input
                                     type="text" 
                                     placeholder='Entrez votre nom'
                                     className='border p-2 w-full rounded'
                                     required/>
                                </div>
                                <div className='flex justify-between mb-4'>
                                    <div className='w-1/2 mr-2'>
                                        <label className='block text-gray-700 font-semibold mb-2'>Date d'expiration</label>
                                        <input
                                         type="text"
                                         placeholder='MM/YY' 
                                         className='border p-2 w-full rounded'
                                         required/>
                                    </div>
                                    <div className='w-1/2 ml-2'>
                                        <label className='block text-gray-700 font-semibold mb-2'>CVV</label>
                                        <input 
                                        type="text" 
                                        placeholder='CVV'
                                        className='border p-2 w-full rounded'
                                        required/>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className='flex items-center mb-2'>
                            <input type="radio"
                            name='payment'
                             checked = {paymentMethode === "paypal"}
                             onChange={() => setPaymentMethode("paypal")} />
                            <label htmlFor="" className='block text-gray-700 ml-2'>PayPal</label>
                        </div>
                        <div className='flex items-center mb-2'>
                            <input type="radio"
                            name='payment'
                             checked = {paymentMethode === "googlepay"}
                             onChange={() => setPaymentMethode("googlepay")} />
                            <label htmlFor="" className='block text-gray-700 ml-2'>Google Pay</label>
                        </div>
                        <div className='flex items-center mb-2'>
                            <input type="radio"
                            name='payment'
                             checked = {paymentMethode === "applepay"}
                             onChange={() => setPaymentMethode("applepay")} />
                            <label htmlFor="" className='block text-gray-700 ml-2'>Apple Pay</label>
                        </div>
                        {paymentMethode === "applepay" && (
                            <div>
                                <h3>Apple Pay</h3>
                                <div></div>
                            </div>
                        )}
                        </div>
              </div>
            </div>
            <div className='md:w-1/3 bg-white p-6 rounded-lg shadow-md border'>
             <h3 className='text-lg font-semibold mb-4'>Récapitulatif de la commande</h3>
             <div className='space-y-4'>
                    {cart.products.map(product => (
                        <div key={product.id} className='flex justify-between'>
                            <div className='flex items-center'>
                                <img 
                                src={product.image} 
                                alt={product.image} 
                                className='w-16 h-16 object-contain rounded'/>
                                <div className='ml-4'>
                                    <h4 className='text-md font-semibold'>{product.name}</h4>
                                    <p className='text-gray-600'>
                                        ${product.price} × {product.quantity}
                                    </p>
                                </div>
                            </div>
                            <div className='text-gray-800 mt-3'>
                                $ {product.price * product.quantity}
                            </div>
                        </div>
                    ))}
             </div>
             <div className='mt-4 border-t pt-4'>
                <div className='flex justify-between'>
                    <span>Prix Totale</span>
                    <span className='font-semibold'>${cart.totalPrice.toFixed(2)}</span>
                </div>
             </div>
             <button className='w-full bg-red-600 text-white py-2 mt-6 hover:bg-red-800'
             onClick={handleOrder}>
             Passer la Commande</button>
            </div>
            </div>
        </div>
   
  )
}

export default Checkout