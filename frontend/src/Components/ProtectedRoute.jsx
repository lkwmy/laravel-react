import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const [user, setUser] = useState(null);
useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);
    
    if (!token && !user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;