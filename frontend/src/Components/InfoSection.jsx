import React from 'react'
import { FaHeadset, FaLock, FaMoneyBillWave, FaShippingFast, FaTag } from 'react-icons/fa';

function InfoSection() {
    const InfoItems = [
 {
    icon : <FaShippingFast className='text-3xl text-red-600'/>,
    title : 'Livraison gratuite',
    description : 'Livraison gratuite partout – plus d’excuses pour ne pas commander !',
 },
 {
    icon : <FaHeadset className='text-3xl text-red-600'/>,
    title : 'Support 24/7',
    description: "Besoin d'aide ? Notre équipe est là pour vous, jour et nuit.",
 },
 {
    icon : <FaMoneyBillWave className='text-3xl text-red-600'/>,
    title : '100% Remboursement',
    description : 'Satisfait ou remboursé à 100 % – aucune prise de risque.',
 },
 {
    icon : <FaLock  className='text-3xl text-red-600'/>,
    title: 'Paiement Sécurisé', 
    description : 'Vos transactions, protégées et sans souci',
 },
 {
    icon : <FaTag className='text-3xl text-red-600'/>,
    title : 'Réduction',
    description : 'Des casquettes stylées à prix réduits – ne manquez pas nos offres !', 
 },
    ];
  return (
    <div className='bg-white pb-8 pt-12'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
            {InfoItems.map((item,index) =>(
                <div key={index} className='bg-sky-50 flex flex-col items-center text-center p-4 border rounded-lg shadow-md
                transform transition-transform duration-300 hover:scale-105 cursor-pointer hover-opacity-20'>
                    {item.icon}
                    <h3 className='mt-4 text-xl font-semibold'>{item.title}</h3>
                    <p className='mt-2 text-gray-600'>{item.description}</p>
                     </div>
            ))}
        </div>
    </div>
  )
}

export default InfoSection