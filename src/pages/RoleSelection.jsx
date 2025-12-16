// src/pages/RoleSelection.js
import RoleCard from "../components/RoleCard";
import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-2 text-center">
        Welcome To <span className="text-orange-500">Kridana</span>
      </h1>

      <p className="text-gray-300 mb-10 text-xl text-center">
        Your Profile. Your Experience.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
        <RoleCard
          title="User"
          points={[
            "View available training sessions, book slots, and track schedule updates.",
            "Purchase gym merchandise, supplements, and training equipment conveniently.",
            "Access instructional and workout videos for guided training anytime.",
            "Connect with trainers for personalized guidance, feedback, and improvement tips.",
          ]}
          onClick={() => navigate("/signup?role=user")}
        />

        <RoleCard
          title="Trainer"
          points={[
            "Manage member details, progress, and communication.",
            "Update and maintain trainer profiles with achievements and specialties.",
            "Track member attendance and manage payment records effortlessly.",
            "Promote services, merchandise, and partner offers within the app.",
          ]}
          onClick={() => navigate("/trainer-signup")}
        />

        <RoleCard
          title="Institute"
          points={[
            "Manage member details, progress, and communication.",
            "Update and maintain trainer profiles with achievements and specialties.",
            "Track member attendance and manage payment records effortlessly.",
            "Promote services, merchandise, and partner offers within the app.",
          ]}
          onClick={() => navigate("/institute-signup")}
        />
      </div>
    </div>
  );
}
