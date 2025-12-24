import React from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";

import RoleSelection from "./pages/RoleSelection";
import Signup from "./pages/Signup";
import TrainerSignup from "./pages/TrainerSignup";
import InstituteSignup from "./pages/InstituteSignup";

import ShopHome from "./components/ShopHome";
import ProductsGridPage from "./components/ProductsGridPage";
import InstituteDashboard from "./components/InstituteDashboard";
import TrainersDashboard from "./components/TrainersDashboard";
import ClassTime from "./components/InstituteDashboard/ClassTime";
import ViewInstitutes from "./ViewInstitues";
import ViewTrainers from "./ViewTrainers";
import AddAddressPage from "./components/AddAddressPage";
import PaymentPage from "./components/PaymentPage";
import PricePlans from "./PricePlans";

import MartialArts from "./MartialArts";
import TeamBall from "./TeamBall";
import Racket from "./Racket";
import TargetPrecision from "./TargetPrecision";
import Fitness from "./Fitness";
import Equestrian from "./Equestrian";
import Adventure from "./Adventure";
import IceSports from "./IceSports";
import Wellness from "./Wellness";
import Dance from "./Dance";

import MonthRangePicker from "./components/MonthRangePicker";
import CartPage from "./components/CartPage";

import "./index.css";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/trainer-signup" element={<TrainerSignup />} />
        <Route path="/institute-signup" element={<InstituteSignup />} />

        {/* shop routes */}
        <Route path="/shop" element={<ShopHome />} />
        <Route path="/shop/products" element={<ProductsGridPage />} />

        <Route path="/institute" element={<InstituteDashboard />} />
        <Route path="/trainers" element={<TrainersDashboard />} />
        <Route path="/classtimings" element={<ClassTime />} />
        <Route path="/viewInstitutes" element={<ViewInstitutes />} />
        <Route path="/viewTrainers" element={<ViewTrainers />} />

        <Route path="/AddressPage" element={<AddAddressPage />} />
        <Route path="/Payment" element={<PaymentPage />} />
        <Route path="/PricePlans" element={<PricePlans />} />

        {/* sports category pages */}
        <Route path="/MartialArts" element={<MartialArts />} />
        <Route path="/TeamBall" element={<TeamBall />} />
        <Route path="/Racket" element={<Racket />} />
        <Route path="/TargetPrecision" element={<TargetPrecision />} />
        <Route path="/Fitness" element={<Fitness />} />
        <Route path="/Equestrian" element={<Equestrian />} />
        <Route path="/Adventure" element={<Adventure />} />
        <Route path="/IceSports" element={<IceSports />} />
        <Route path="/Wellness" element={<Wellness />} />
        <Route path="/Dance" element={<Dance />} />

        <Route path="/MonthRangePicker" element={<MonthRangePicker />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
