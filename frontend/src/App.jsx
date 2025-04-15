import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import { useState } from "react";
import Order from "./Pages/Order";
import FiltredData from "./Pages/FiltredData";
import ProductDetail from "./Pages/ProductDetail";
import axios from "axios";
import { UserProvider } from "./DataUtilisateur/UserContext";
import LoginAdmin from "./Admin/LoginAdmin";
import RegisterAdmin from "./Admin/RegisterAdmin";
import DashboardAdmin from "./Admin/DashboardAdmin";
import ProtectedRoute from "./Components/ProtectedRoute";
import DashboardHome from "./Admin/DashboardHome";
import ProductsManagement from "./Admin/ProductsManagement";
import UsersManagement from "./Admin/UsersManagement";
import MessagerieMangement from "./Admin/MessagerieMangement";
import ProtectedAdminRoute from "./Admin/ProtectedAdminRoute";
import XXX from "./Redux/fetchProducts";
import Contact from "./Pages/Contact";


// Configuration globale pour Axios
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.withCredentials = true;

function AppContent() {
  const [order, setOrder] = useState(null);
  const location = useLocation();

  // Liste des routes qui ne doivent pas afficher le Navbar et le Footer
  const adminRoutes = ["/login/admin",
     "/register/admin", 
     "/dashboard/admin", 
     "/dashboard/admin/home", 
     "/dashboard/admin/users",
     "/dashboard/admin/product",
     "/dashboard/admin/*",
     "/dashboard/admin/messagerie"];

  // Vérifie si la route actuelle est une route admin
  const isAdminRoute = adminRoutes.includes(location.pathname);

  return (
    <>
      <UserProvider>
        {!isAdminRoute && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} key="home" />
          <Route path="/shop" element={<Shop />} key="shop" />
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/XXX" element ={<XXX/>}/>
          <Route path="/cart" element={<Cart />} key="cart" />
          <Route path="/checkout" element={<Checkout setOrder={setOrder} />} key="checkout" />
          <Route path="/order-confirmation" element={<Order order={order} />} key="order" />
          <Route path="/filter-data" element={<FiltredData />} key="filter" />
          <Route path="/product/:id" element={<ProductDetail />} key="product" />

          {/* Admin routes */}
          <Route path="/login/admin" element={<LoginAdmin />} key="loginAdmin" />
          {/* <Route path="/register/admin" element={<RegisterAdmin />} key="registerAdmin" /> */}
          {/* <Route path="/dashboard/admin/*" element={<DashboardAdmin/>} key="dashboardAdmin"/> */}

          {/* route parent qui contient les routes enfants  */}
          <Route path="/dashboard/admin/*" element={
            <ProtectedAdminRoute>
            <DashboardAdmin/>
            </ProtectedAdminRoute>
            } key="dashboardAdmin">
            <Route path="home" element={
              <ProtectedAdminRoute>
              <DashboardHome/>
              </ProtectedAdminRoute>
              }/>
            <Route path="users" element={
              <ProtectedAdminRoute>
              <UsersManagement/>
              </ProtectedAdminRoute>
              }/>
            <Route path="product" element={
              <ProtectedAdminRoute>
              <ProductsManagement/>
              </ProtectedAdminRoute>
              }/>
              <Route path="messagerie" element={
                <ProtectedRoute>
                  <MessagerieMangement/>
                </ProtectedRoute>
              }/>
          </Route>
            
        </Routes>
        {!isAdminRoute && <Footer />}
      </UserProvider>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;