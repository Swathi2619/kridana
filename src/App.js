import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";  // ✅ NO Router import
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";

// Core pages
import RoleSelection from "./pages/RoleSelection";
import Signup from "./pages/Signup";
import TrainerSignup from "./pages/TrainerSignup";
import InstituteSignup from "./pages/InstituteSignup";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import ShopPage from "./components/ShopPage";
import Navbar from "./components/Navbar";
import InstituteDashboard from "./components/InstituteDashboard";
import TrainersDashboard from "./components/TrainersDashboard";
import UserDashboard from "./components/UserDashboard";
import ViewInstitutes from "./pages/ViewInstitutes";
import ViewTrainers from "./pages/ViewTrainers";
import InstituteDetailsPage from "./pages/InstituteDetailsPage";
import TrainerDetailsPage from "./pages/TrainerDetailsPage";

// Shop components
import ProductsGridPage from "./components/ProductsGridPage";
import AddAddressPage from "./components/AddAddressPage";
import PaymentPage from "./components/PaymentPage";
import CartPage from "./components/CartPage";
import WishlistPage from "./components/WishlistPage";
import PricePlans from "./PricePlans";

import "./index.css";

function App() {
  const location = useLocation();

  const hideNavbarPaths = [
    "/",
    "/login",
    "/signup",
    "/trainer-signup",
    "/institute-signup",
  ];

  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="bg-white text-black min-h-screen">
            {showNavbar && <Navbar />}
            
            <Routes>
              {/* Auth & Landing */}
              <Route path="/" element={<RoleSelection />} />
              <Route path="/login" element={<Login />} />
              <Route path="/landing" element={<Landing />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/trainer-signup" element={<TrainerSignup />} />
              <Route path="/institute-signup" element={<InstituteSignup />} />

              {/* Shop Routes */}
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/products" element={<ProductsGridPage />} />
              <Route path="/AddressPage" element={<AddAddressPage />} />
              <Route path="/Payment" element={<PaymentPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/PricePlans" element={<PricePlans />} />

              {/* Dashboards */}
              <Route path="/institutes/dashboard" element={<InstituteDashboard />} />
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/trainers/dashboard" element={<TrainersDashboard />} />

              {/* View Pages */}
              <Route path="/viewInstitutes" element={<ViewInstitutes />} />
              <Route path="/ViewInstitutes" element={<ViewInstitutes />} />
              <Route path="/viewTrainers" element={<ViewTrainers />} />
              <Route path="/ViewTrainers" element={<ViewTrainers />} />
              <Route path="/institutes/:id" element={<InstituteDetailsPage />} />
              <Route path="/trainers/:id" element={<TrainerDetailsPage />} />

              {/* Services - PLACEHOLDER */}
              <Route path="/services/fitness" element={<div className="p-8 text-center text-gray-500">Fitness Coming Soon</div>} />
              <Route path="/services/martial-arts" element={<div className="p-8 text-center text-gray-500">Martial Arts Coming Soon</div>} />
              <Route path="/services/equestrian-sports" element={<div className="p-8 text-center text-gray-500">Equestrian Coming Soon</div>} />
              <Route path="/services/racketsports" element={<div className="p-8 text-center text-gray-500">Racket Sports Coming Soon</div>} />
              <Route path="/services/adventure-outdoor-sports" element={<div className="p-8 text-center text-gray-500">Adventure Coming Soon</div>} />
              <Route path="/services/teamball" element={<div className="p-8 text-center text-gray-500">TeamBall Coming Soon</div>} />
            </Routes>
          </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
