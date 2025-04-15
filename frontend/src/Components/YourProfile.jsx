import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function YourProfile() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [number, setNumber] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [EditPassword, setEditPassword] = useState(false);
  const [EditName, setEditName] = useState(false);
  const [EditNumber, setEditNumber] = useState(false);
  const [newNumber, setNewNumber] = useState('');
  const [validName, setValidName] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
  const [errorPassConfMessage, setErrorPassConfMessage] = useState('');

// validation pour vérifier le confirmationde mot de passe 
useEffect(() => {
  if (!password_confirmation.trim()) {
    setErrorPassConfMessage('La confirmation du mot de passe est requise.')
  } else if (password_confirmation !== password) {
    setErrorPassConfMessage('Le mot de passe de confirmation doit être identique au mot de passe.')
  } else {
    setErrorPassConfMessage('');
  }
},[password_confirmation]);

  //validation pour vérifier le mot de passe 
  useEffect(() => {
    if (password.length < 8) {
      setErrorMessage('Le mot de passe doit contenir au moins 8 caractères.');
    } else if (!/[A-Z]/.test(password)) {
      setErrorMessage('Le mot de passe doit contenir au moins une lettre majuscule.');
    } else if (!/[0-9]/.test(password)) {
      setErrorMessage('Le mot de passe doit contenir au moins un chiffre.');
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setErrorMessage('Le mot de passe doit contenir au moins un caractère spécial.');
    } else {
      setErrorMessage(''); // Si tout est valide, on réinitialise le message d'erreur
    }
  }, [password]);
  

  // validation pour vérifier que le nom a au moin 2 caractéres
  useEffect(()=>{
    if (newUserName.length >= 2) {
      setValidName(true);
    } else {
      setValidName(false);
    }
  },[newUserName]);
  
  const validateField = (fieldName, value) => {
    let error = '';
    // validation logic remains the same as before
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };
 
// changer le nom
  const handleChangeName = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch('http://localhost:8000/api/update-name', { name: newUserName }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json'
        }
      });
      if (response.data.success) {
        alert("Nom mis à jour avec succès !");
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Échec de la mise à jour du nom');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch('http://localhost:8000/api/update-password', { 
        currentPassword, password, password_confirmation 
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json'
        }
      });
      if (response.data.success) {
        alert("Mot de passe mis à jour avec succès !");
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Échec de la mise à jour du mot de passe');
    } finally {
      setLoading(false);
    }
  };
  // changer le numéro de téléphone
  const handleChangeNumber = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch('http://localhost:8000/api/update-number', { number: newNumber }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json'
        }
      });
      if (response.data.success) {
        alert("Numéro de téléphone mis à jour avec succès !");
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Échec de la mise à jour du numéro');
    } finally {
      setLoading(false);
    }
  };

  const nameBar = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Nom : {nameBar?.name}</label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email : {nameBar?.email}</label>
      </div>
      {/* changer le mot de passe */}
      <div className="border border-gray-300 p-4 mb-6 rounded-lg shadow-sm bg-gray-50">
        <div className='flex items-center justify-between' onClick={() => setEditPassword(!EditPassword)}>
          <h3 className='text-lg font-semibold mb-2'>Changer mot de passe</h3>
          {EditPassword ? '✔️' : '✏️'}
        </div>
        <div className={`space-y-4 ${EditPassword ? "" : "hidden"}`}>
          <div className="mb-4">
            <label className="block text-gray-700">Mot de Passe</label>
            <input
              type="password"
              className="w-full px-3 py-2 border"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validateField('password', e.target.value);
              }}
            />
            {errorMessage && <p className='text-red-600'>{errorMessage}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirmer mot de passe</label>
            <input
              type="password"
              className="w-full px-3 py-2 border"
              placeholder="Confirmez votre mot de passe"
              value={password_confirmation}
              onChange={(e) => {
                setPasswordConfirmation(e.target.value);
                validateField('password_confirmation', e.target.value);
              }}
            />
            {errorPassConfMessage && <p className='text-red-600'>{errorPassConfMessage}</p>}
          </div>
          <button 
          type="submit" 
          className={`w-full py-2 ${loading ? 'bg-gray-400' : (!errorMessage && !errorPassConfMessage) ? 'bg-red-600' : 'bg-gray-300'} text-white`}
           onClick={handleChangePassword}
            disabled={loading || errorMessage || errorPassConfMessage}>
            {loading ? 'Enregistrement...' : 'Sauvegarder'}
          </button>
        </div>
      </div>

      {/* changer le nom */}
      <div className="border border-gray-300 p-4 mb-6 rounded-lg shadow-sm bg-gray-50">
        <div className='flex items-center justify-between' onClick={() => setEditName(!EditName)}>
          <h3 className='text-lg font-semibold mb-2'>Changer le Nom</h3>
          {EditName ? '✔️' : '✏️'}
        </div>
        <form onSubmit={handleChangeName}>
          <div className={`space-y-4 ${EditName ? "" : "hidden"}`}>
            <div className="mb-4">
              <label className="block text-gray-700">Nouveau Nom</label>
              <input
                type="text"
                className="w-full px-3 py-2 border"
                placeholder="Veuillez insérez votre nouveau nom"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
                {newUserName.length < 2 && (
                <p className="text-red-600">Le nom doit contenir au moins 2 caractères.</p>
              )}
            </div>
            <button 
            type="submit"
             className={`w-full py-2 ${loading ? 'bg-gray-400' : validName ? 'bg-red-600' : 'bg-gray-300'} text-white`} 
             disabled={loading || !validName}>
            {loading ? 'Enregistrement...' : 'Sauvegarder'}
          </button>
          </div>
        </form>
      </div>

      {/* changer le numéro */}
      <div className="border border-gray-300 p-4 mb-6 rounded-lg shadow-sm bg-gray-50">
        <div className='flex items-center justify-between' onClick={() => setEditNumber(!EditNumber)}>
          <h3 className='text-lg font-semibold mb-2'>Changer le numéro</h3>
          {EditNumber ? '✔️' : '✏️'}
        </div>
        <div className={`space-y-4 ${EditNumber ? "" : "hidden"}`}>
          <div className="mb-4">
            <label className="block text-gray-700">Nouveau Numéro</label>
            <input
              type="text"
              className="w-full px-3 py-2 border"
              placeholder="Veuillez insérez votre nouveau numéro de téléphone"
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-red-600 text-white py-2" onClick={handleChangeNumber} disabled={loading}>
            {loading ? 'Enregistrement...' : 'Sauvegarder'}
          </button>
        </div>
      </div>
    </div>
  );
}
