import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import img from "../src/assets/bharat-mata.jpg";
import Button from '@mui/material/Button';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function HomeBody() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Logout handler
  const handleLogout = (e) => {
    e.preventDefault();

    // Remove user data
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("emailID");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div>
      {/* Top Header */}
      <div className="flex justify-between items-center mt-1 px-4">
        {/* Left Side (Sign Up / User Info) */}
        <div className="w-1/3 flex justify-center">
          {!token ? (
            <Link
              to="/signUp"
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
            >
              Sign Up
            </Link>
          ) : (
            <Link
              to="/userInfo"
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
            >
              <AccountBoxIcon />
            </Link>
          )}
        </div>

        {/* Middle Image */}
        <div className="w-1/3 flex justify-center">
          <div className="h-44 w-44 bg-orange-50 flex items-center justify-center rounded-full shadow-md">
            <img
              src={img}
              alt="Bharat Mata"
              className="h-full w-full object-contain rounded-full"
            />
          </div>
        </div>

        {/* Right Side (Login / Logout / Admin Update) */}
        <div className="w-1/3 flex flex-col items-center gap-2">
          {!token ? (
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
            >
              Login
            </Link>
          ) : (
            <Button
              variant="contained"
              onClick={handleLogout}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
            >
              Logout
            </Button>
          )}

          {userRole === "admin" && (
            <Link
              to="/updatePassword"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
            >
              Update Yourself
            </Link>
          )}
        </div>
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {/* Create Shakhaa */}
        <div className="w-60 h-32 bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col justify-center items-center text-center">
          <h3 className="text-white text-lg font-semibold mb-2">
          नई  <span className="text-yellow-200">शाखा</span> 
          </h3>
          <Link
            to="/addShakhaa"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
          >
           बनाये 
          </Link>
        </div>

        {/* Create Task */}
        <div className="w-60 h-32 bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col justify-center items-center text-center">
          <h3 className="text-white text-lg font-semibold mb-2">
           नया <span className="text-yellow-200">कार्य </span>
          </h3>
          <Link
            to="/addTask"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
          >
          जोड़े 
          </Link>
        </div>
      </div>

      <hr />

      {/* See Section */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {/* See Shakhaa */}
        <div className="w-60 h-32 bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col justify-center items-center text-center">
          <h3 className="text-white text-lg font-semibold mb-2">
           सभी  <span className="text-yellow-200"> शाखाएं </span>
          </h3>
          <Link
            to="/allShakhaa"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
          >
          देखें
          </Link>
        </div>

        {/* See Task */}
        <div className="w-60 h-32 bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col justify-center items-center text-center">
          <h3 className="text-white text-lg font-semibold mb-2">
           सभी <span className="text-yellow-200">कार्य</span>
          </h3>
          <Link
            to="/allTask"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
          >
          देखें
          </Link>
        </div>
      </div>
    </div>
  );
}
