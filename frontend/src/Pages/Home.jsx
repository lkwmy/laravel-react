import React, { useEffect } from 'react';
import { Categories, useFackeData } from '../assets/mockData';
import ecommerce from '../assets/Images/ecommerce.png';
import InfoSection from '../Components/InfoSection';
import CategorySection from '../Components/CategorySection';
import { setProducts } from '../Redux/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../Components/ProductCard.jsx';
import Shop from './Shop.jsx';
import { ToastContainer } from 'react-toastify';


// Import de ton hook personnalisé


function Home() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product);

  // Utilisation du hook personnalisé pour récupérer les données
  const fackeData = useFackeData();

  useEffect(() => {
    if (fackeData.length > 0) {
      // Dispatche les données quand elles sont disponibles
      dispatch(setProducts(fackeData));
    }
  }, [fackeData, dispatch]);

  return (
    <div className='bg-sky-20 mt-2 px-4 md:px-16 lg:px-24'>
      <div className='container mx-auto py-4 flex flex-col md:flex-row space-x-2'>
        <div className='w-full md:w-3/12'>
          <div className='bg-sky-400 text-white opacity-90 rounded-md text-xs font-bold px-2 py-2.5'>
          Catégories
          </div>
          <ul className='space-y-4 opacity-100 bg-gray-100 p-3 '>
            {Categories.map((category, index) => (
              <li key={index} className='flex items-center opacity-90 text-sm font-medium'>
                <div className='w-2 h-2 border opacity-90 border-red-500 rounded-full mr-2'></div>
                {category}
              </li>
            ))}
          </ul>
        </div>

        <div className='w-full md:w-9/12 mt-8 md:mt-0 h-96 relative'>
          <img src={ecommerce} alt='' className=' h-full w-full'/>
          <div className='absolute top-10 left-10'>
            <p className='text-grey-600 mb-4'>Casquetty</p>
            <h2 className='text-3xl font-bold'>Bienvenue</h2>
            <p className='text-xl mt-2.5 font-bold text-grey-800'>MILLIONS + PRODUCTS</p>
            <button className='bg-sky-400 rounded-md  px-8 py-1.5 text-white mt-4 hover:bg-red-700 
            transform transition-transform duration-300 hover:scale-105'>
              Shop Now
            </button>
          </div>
        </div>
      </div>

      <InfoSection />
      <CategorySection />
      <div className='container mx-auto py-12'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Top Products</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer'>
          {products.products.length > 0 ? (
            products.products.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>Aucun produit disponible</p>
          )}
        </div>
      </div>
      <Shop />
      <ToastContainer />
    </div>
    
  );
}

export default Home;


