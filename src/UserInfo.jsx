import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbaar from "./Navbaar";
import Footer from "./Footer";
import BackButton from "./Backbutton";

export default function UserInfo() {
  const [userData, setUserData] = useState({
    name: "",
    emailId: "",
    role: "",
  });

  useEffect(() => {
    setUserData({
      name: localStorage.getItem("name") || "",
      emailId: localStorage.getItem("emailId") || "",
      role: localStorage.getItem("role") || "",
    });
  }, []);

  return (
    <>
      <Navbaar />

      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-orange-200 via-yellow-100 to-green-200 p-4">
        <div className="bg-white rounded-2xl shadow-xl w-96 p-6 transform hover:scale-105 transition duration-300">
          {/* Profile Section */}
          <div className="flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full bg-gradient-to-r from-orange-400 to-green-400 flex items-center justify-center text-white text-3xl font-bold shadow-md">
              {userData.name ? userData.name.charAt(0).toUpperCase() : "U"}
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-800">{userData.name}</h2>
            <p className="text-gray-600">{userData.emailId}</p>
            <span className="text-sm text-green-600 font-semibold mt-1">
              Role: {userData.role || "User"}
            </span>
          </div>

          <hr className="my-4" />

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Link
              to={userData.role === "admin" ? "/updatePassword" : "/signUp"}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-center shadow-md transition"
            >
              Update Account
            </Link>

            <div className="flex justify-center">
              <BackButton />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
