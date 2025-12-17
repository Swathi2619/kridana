import { Routes, Route } from "react-router-dom";
import RoleSelection from "./pages/RoleSelection";
import Signup from "./pages/Signup"; // import your signup page
// import Login from "./pages/Login"; // optional, if you have a login page
import TrainerSignup from "./pages/TrainerSignup";
import InstituteSignup from "./pages/InstituteSignup";
import ShopPage from './components/ShopPage';
import InstituteDashboard from './components/InstituteDashboard';
import './index.css';

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
    </Routes>
  );
}

export default App;
