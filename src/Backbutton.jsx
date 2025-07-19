import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    sessionStorage.setItem("showWelcomeToast", "true");
    navigate("/");
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 text-orange-600 border border-orange-300 hover:bg-orange-100 transition-all duration-200 rounded-xl px-4 py-2 shadow-sm mt-4 ml-4"
    >
      <ArrowLeft size={20} /> Go Back Home
    </button>
  );
}
