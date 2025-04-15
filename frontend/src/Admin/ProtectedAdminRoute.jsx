import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({children}) => {
    const token = localStorage.getItem('token'); // vérifier si le token est présent 
    return token ? children : <Navigate to="/"/>
};

export default ProtectedAdminRoute;