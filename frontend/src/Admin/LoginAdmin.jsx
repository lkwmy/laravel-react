import React, { useState } from 'react'
import { loginUser } from '../Components/AuthService';


function LoginAdmin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
   
    const handleLoginAdmin = async (e) => {
        e.preventDefault();
      await loginUser (email, password);
    };

   

  return (
    <div>
         <h2 className='text-2xl font-bold mb-4'>Se connecter</h2> 
      <form onSubmit={handleLoginAdmin}>
        <div className='mb-4'>
          <label  className='block text-gray-700'>Email</label>
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

       
        <div className='mb-4'>
          <button type='submit' className='w-full bg-red-600 text-white py-2' 
           disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </div>
      </form>
    
    </div>
  )
}

export default LoginAdmin

