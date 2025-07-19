import {Link} from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import img from "../src/assets/bharat-mata.jpg";

export default function HomeBody(){

  let userRole = localStorage.getItem("role");

  // useEffect(() => {
  //   const shouldShowToast = sessionStorage.getItem("showWelcomeToast");
  //   if (shouldShowToast === "true") {
  //     toast.success("Welcome To The Page !");
  //     sessionStorage.removeItem("showWelcomeToast"); // clean up
  //   }
  // }, []);
    return(
      <div>
         <div className="flex justify-around items-center mt-1">
             <Link to="/signUp" className="inline-block mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"> Sign up
             </Link>

            <div className="h-44 w-44 bg-orange-50 flex items-center justify-center">
              <img src={img} alt="RSS-flag" className="h-full w-full object-contain" />
           </div>

           {/* Right side: Login + Update Password (if admin) */}
          <div className="flex flex-col items-center">
              <Link to="/login" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition">
                Login
              </Link>

               {userRole === "admin" && (
                  <Link to="/updatePassword"  className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition">
                    Update YourSelf
                 </Link>
               )}
          </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-6">
          {/* Create Shakhaa */}
          <div className="w-60 h-32 bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col justify-center items-center text-center">
                 <h3 className="text-white text-lg font-semibold mb-2">
                    Create New <span className="text-yellow-200">Shakhaa</span>
                </h3>
                <Link
                     to="/addShakhaa"
                     className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
                   > Create
                </Link>
           </div>

          {/* Create Task */}
        <div className="w-60 h-32 bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col justify-center items-center text-center">
               <h3 className="text-white text-lg font-semibold mb-2">
                  Create New <span className="text-yellow-200">Task</span>
              </h3>
              <Link
                  to="/addTask"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
                  > Create
              </Link>
        </div>
    </div>
    <hr />
      <div className="flex flex-wrap justify-center gap-6 mt-6">
          {/* see Shakhaa */}
          <div className="w-60 h-32 bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col justify-center items-center text-center">
                 <h3 className="text-white text-lg font-semibold mb-2">
                  See All <span className="text-yellow-200">Shakhaas</span>
                </h3>
                <Link
                     to="/allShakhaa"
                     className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
                   > See
                </Link>
           </div>

          {/* see Task */}
        <div className="w-60 h-32 bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col justify-center items-center text-center">
               <h3 className="text-white text-lg font-semibold mb-2">
                  See All <span className="text-yellow-200">Tasks</span>
              </h3>
              <Link
                  to="/allTask"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
                  > See
              </Link>
        </div>
    </div>


         
        
 </div>
      
    )
}