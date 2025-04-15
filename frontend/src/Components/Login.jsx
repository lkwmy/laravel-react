import React, { useState } from 'react'
import { loginUser } from './AuthService';



function Login({openSignUp}) {
  // Définir les états pour email, mot de passe et gestion des erreurs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

    
 const handleLogin = async (e) => {
         e.preventDefault();
       await loginUser (email, password);
     };
 

  return (
    <div className='opacity-100'>
      <h2 className='text-2xl font-bold mb-4'>Login</h2> 
      <form onSubmit={handleLogin}>
        <div className='mb-4 opacity-100'>
          <label  className='block text-gray-700' >Email</label>
          <input type="email" className='w-full px-3 py-2 border' 
          placeholder='Entrez votre email'
          
          value={email}
          onChange={(e) => setEmail(e.target.value)}  // Met à jour l'état email
          required />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700'>Mot de Passe</label>
          <input type="password" className='w-full px-3 py-2 border'
          placeholder='Entrez votre mot de passe' 
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Met à jour l'état password
           required />
        </div>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <div className='mb-4 flex items-center justify-between'>
          <label className='inline-flex items-center'>
            <input type="checkbox" className='form-checkbox'/>
            <span className='ml-2 text-gray-700'>Remember Me</span>
          </label>
          <a href="#" className='text-red-800'>Forgot Password ? </a>
        </div>
        <div className='mb-4'>
          <button type='submit' className='w-full bg-red-600 text-white py-2' 
           disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </div>
      </form>
      <div className='text-center'>
        <span className='text-gray-700'>Don't have an account ? </span>
        <button className='text-red-800' onClick={openSignUp}>Sign Up</button>
      </div> 
    </div>
  )
}

export default Login

