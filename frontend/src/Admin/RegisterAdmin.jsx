import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterAdmin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateField = (field, value) => {
    let fieldErrors = { ...errors };

    switch (field) {
      case 'name':
        fieldErrors.name = value ? '' : 'Le nom est requis.';
        break;
      case 'email':
        fieldErrors.email = value.includes('@') ? '' : 'Email invalide.';
        break;
      case 'password':
        fieldErrors.password = value.length >= 6 ? '' : 'Le mot de passe doit contenir au moins 6 caractères.';
        break;
      case 'password_confirmation':
        fieldErrors.password_confirmation = value === password ? '' : 'Les mots de passe ne correspondent pas.';
        break;
      default:
        break;
    }

    setErrors(fieldErrors);
  };
console.log({name, password, email});
  const handleRegisterAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:8000/api/admin/register', {
        name,
        email,
        password,
      });
      navigate('/login/admin');
      console.log('admin registered successfully');
    } catch (err) {
      setErrors({ ...errors, global: 'Erreur lors de la création du compte.' });
      console.log('error de creation')
    } finally {
      setLoading(false);
    }
  };

  const valid = name && email && password && password_confirmation === password;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleRegisterAdmin}>
        <div className="mb-4">
          <label className="block text-gray-700">Nom</label>
          <input
            type="text"
            className="w-full px-3 py-2 border"
            placeholder="Entrez votre nom"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validateField('name', e.target.value);
            }}
          />
          {errors.name && <p className="text-red-600">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateField('email', e.target.value);
            }}
          />
          {errors.email && <p className="text-red-600">{errors.email}</p>}
        </div>
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
          {errors.password && <p className="text-red-600">{errors.password}</p>}
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
          {errors.password_confirmation && (
            <p className="text-red-600">{errors.password_confirmation}</p>
          )}
        </div>
        {errors.global && <p className="text-red-600">{errors.global}</p>}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2"
          disabled={loading || !valid}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default RegisterAdmin;



