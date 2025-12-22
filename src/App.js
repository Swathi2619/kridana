import { Routes, Route } from "react-router-dom";
import RoleSelection from "./pages/RoleSelection";
import Signup from "./pages/Signup";
import TrainerSignup from "./pages/TrainerSignup";
import InstituteSignup from "./pages/InstituteSignup";
import ShopPage from "./components/ShopPage";
import InstituteDashboard from "./components/InstituteDashboard";
import TrainersDashboard from "./components/TrainersDashboard";
import ClassTime from './components/InstituteDashboard/ClassTime';
import ViewInstitutes from "./ViewInstitues";
import ViewTrainers from "./ViewTrainers";
import AddAddressPage from "./components/AddAddressPage";
import PaymentPage from "./components/PaymentPage";
import PricePlans from "./PricePlans";
import MonthRangePicker from "./components/MonthRangePicker";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelection />} />
      <Route path="/signup" element={<Signup />} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/trainer-signup" element={<TrainerSignup />} />
      <Route path="/institute-signup" element={<InstituteSignup />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/institute" element={<InstituteDashboard />} />
      <Route path="/trainers" element={<TrainersDashboard />} />
      <Route path="/classtimings" element={<ClassTime />} />
      <Route path="/viewInstitutes" element={<ViewInstitutes />} />
      <Route path="/viewTrainers" element={<ViewTrainers />} />
      <Route path="/AddressPage" element={<AddAddressPage />} />
      <Route path="/Payment" element={<PaymentPage />} />
      <Route path="/PricePlans" element={<PricePlans />} />
      <Route path="/MonthRangePicker" element={<MonthRangePicker />} />
    </Routes>
  );
}

export default App;