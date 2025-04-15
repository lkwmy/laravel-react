import React, { useState, useEffect } from 'react';
import { registerUser } from './AuthService';

function Register({ openLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [number, setNumber] = useState(0);
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Validation individuelle des champs
  const validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          error = 'Le nom est requis.';
        } else if (value.length < 2) {
          error = 'Le nom doit contenir au moins 2 caractères.';
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = "L'email est requis.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "L'email est invalide.";
        }
        break;

      case 'password':
        if (value.length < 8) {
          error = 'Le mot de passe doit contenir au moins 8 caractères.';
        } else if (!/[A-Z]/.test(value)) {
          error = 'Le mot de passe doit contenir au moins une lettre majuscule.';
        } else if (!/[a-z]/.test(value)) {
          error = 'Le mot de passe doit contenir au moins une lettre minuscule.';
        } else if (!/[0-9]/.test(value)) {
          error = 'Le mot de passe doit contenir au moins un chiffre.';
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          error = 'Le mot de passe doit contenir au moins un caractère spécial.';
        }
        break;

      case 'password_confirmation':
        if (!value.trim()) {
          error = 'La confirmation du mot de passe est requise.';
        } else if (value !== password) {
          error = 'Le mot de passe de confirmation doit être identique au mot de passe.';
        }
        break;

      case 'number':
        if (!value.trim()) {
          error = 'Le numéro de téléphone est requis.';
        } else if (/[^0-9+]/.test(value)) {
          error = "Le numéro de téléphone ne doit contenir que des chiffres ou un '+' au début.";
        } else if (!/^\+?\d{8,12}$/.test(value)) {
          error = 'Le numéro de téléphone doit contenir entre 8 et 12 chiffres et peut commencer par un "+".';
        }
        break;

      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  // Vérification complète du formulaire
  const validateForm = () => {
    validateField('name', name);
    validateField('email', email);
    validateField('password', password);
    validateField('password_confirmation', password_confirmation);
    validateField('number', number);

    return Object.values(errors).every((error) => error === '') &&
      name.trim() &&
      email.trim() &&
      password.trim() &&
      password_confirmation.trim() &&
      number.trim();
  };

  // Vérification de la validité globale
  useEffect(() => {
    const isFormValid =
      Object.values(errors).every((error) => error === '') &&
      name.trim() &&
      email.trim() &&
      password.trim() &&
      password_confirmation.trim() &&
      number.trim();

    setValid(isFormValid);
  }, [errors, name, email, password, password_confirmation, number]);

  // Gestion de la soumission du formulaire
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (validateForm()) {
      const { success, message } = await registerUser(name, email, password, number,password_confirmation);

      setLoading(false);
      

      if (success) {
        window.location.href = '/'; // Rediriger vers la page Home
        
      } else {
        setErrorMessage(message); // Affichez un message d'erreur
        
      }
    } else {
      setLoading(false);
      console.log('Formulaire invalide :', errors);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleRegister}>
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
          <label className="block text-gray-700">Numéro de téléphone</label>
          <input
            type="text"
            className="w-full px-3 py-2 border"
            placeholder="Entrez votre numéro de téléphone"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
              validateField('number', e.target.value);
            }}
          />
          {errors.number && <p className="text-red-600">{errors.number}</p>}
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

        {errorMessage && <p className="text-red-600">{errorMessage}</p>}

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2"
          disabled={loading || !valid}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <div className="text-center mt-4">
        <span className="text-gray-700">Already have an account?</span>{' '}
        <button className="text-red-800" onClick={openLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Register;



