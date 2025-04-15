import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';  // lire 
import Modal from './Modal';
import Login from './Login';
import Register from './Register';
import { setSearchTerm } from '../Redux/ProductSlice';
import { useUser } from '../DataUtilisateur/UserContext';
import axios from 'axios';
import {  Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import ModelYourProfile from './ModelYourProfile';
import YourProfile from './YourProfile';

function Navbar() { 



const [isModelOpen, setIsModelOpen] = useState(false);
const [isLogin, setIsLogin] = useState(true);
const [search, setSearch] = useState(); 
const dispatch = useDispatch ();
const navigate = useNavigate();


const handleSearch = (e) => {
    e.preventDefault()
    dispatch(setSearchTerm(search))
    navigate('/filter-data')
}


const openSignUp = () => {
  setIsLogin(false)
  setIsModelOpen(true)
}

const openLogin = () => {
  setIsLogin(true)
  setIsModelOpen(true)
}

const checkTokenValidity = async () => {
  const token = localStorage.getItem("token");
  if(!token){
    return {valid:false, message:"y'a pas de token valid"};
  }
  try {
    const response = await axios.get("http://localhost:8000/api/verify-token", {
      headers:{
        Authorization: `Bearer ${token}`,
      },
    });
    return {valid: true, user: response.data.user};
  } catch (error) {
    return {valid:false, message:" Token Invalid"};
  }
};

const [user, setUser] = useState(null);
const [tokenValid, setTokenValid] = useState(null); 

const openYourProfile = () => {
  setIsYourProfileOpen(true)
}

useEffect(() => {
    const verifyToken = async () => {
      const result = await checkTokenValidity();
      if (result.valid) {
        setUser(result.user);
        setTokenValid(true);
      } else {
        setTokenValid(false);
        localStorage.removeItem("token"); // Supprime le token s'il est invalide
      }
    };
    verifyToken();
},[]);

const products = useSelector(state => state.cart.products);
const nameBar = JSON.parse(localStorage.getItem("user"));

const [isYourProfileOpen, setIsYourProfileOpen] = useState(false); 
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
        <div className="text-lg font-bold opacity-90">
          <Link to="/">Casquetty</Link>
        </div>
        <div className="relative flex-1 mx-4">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Recherche de Produit"
              className="w-full border opacity-50 py-2 px-4 pr-10" // Ajout de `pr-10` pour laisser de l'espace à droite pour l'icône
            onChange={(e) => {setSearch(e.target.value);
              handleSearch(e)
            }}
            
            />
            <FaSearch className="absolute top-1/2 right-3 transform  -translate-y-1/2 text-red-500" />
          </form>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className='relative'>
            <FaShoppingCart className="text-lg" />
            {products.length > 0 && (
              <span className='absolute top-0 text-xs w-3 left-3 bg-red-600 rounded-full flex justify-center items-center text-white'>
                {products.length}
              </span>
            )}
          </Link>
          {tokenValid === null ? (
        <p>Vérification en cours...</p>
      ) : tokenValid ? (
            <div>
              {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <div className='size-8 rounded-full bg-white flex items-center justify-center text-black font-bold'>
                   {user?.name.charAt(0).toUpperCase()}
                  </div>
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                <button 
                onClick = {() => {
                  setIsYourProfileOpen (true) ;
                }}
                 className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                >
                  Your Profile
                </button>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      window.location.reload();
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
              </div>
      ) : (
        <div>
        <button className="hidden md:block"
        onClick={() => setIsModelOpen(true)}>
          Login | Register
        </button>
        <button className="block md:hidden">
          <FaUser />
        </button>
        </div>
      )}
          
        </div>
      </div>
      <div className='flex items-center justify-center space-x-10 py-4 text-sm font-bold'>
        <Link to="/" className='hover:underline'>
        Home
        </Link>
        <Link to="/shop" className='hover:underline'>
        Shop
        </Link>
        <Link to="/contact" className='hover:underline'>
        Contact
        </Link>
        <Link to="/" className='hover:underline'>
        About
        </Link>
      </div>
     <Modal isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}>
      {isLogin ? <Login openSignUp={openSignUp}/> : <Register openLogin={openLogin}/>}
     </Modal> 
     <ModelYourProfile isYourProfileOpen={isYourProfileOpen} setIsYourProfileOpen={setIsYourProfileOpen}>
       <YourProfile openYourProfile={openYourProfile}/>
     </ModelYourProfile>
     <div>
    </div>
    </nav>
  );
}

export default Navbar;
