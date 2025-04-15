import React, { createContext, useContext, useState } from 'react';

// Créer le contexte utilisateur
const UserContext = createContext();

// Fournisseur de contexte
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stocke l'utilisateur

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte
export const useUser = () => useContext(UserContext);
