import {Navigate,useLocation} from "react-router-dom";
import {jwtDecode }from "jwt-decode";

export default function ProtectedRoute({ children ,role}) {
  const token = localStorage.getItem("token");
  const userrole = localStorage.getItem("role");
  const location = useLocation();

  if(!token){
    return <Navigate to="/login" state={{from:location}} replace />
  }
  
  if(role &&  userrole !== role){
    return <Navigate to="/" /> // redirect if role doesn't match
  }
  try{
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000 ; //1 minute

        if(decoded.exp < currentTime){
               localStorage.clear();
                return <Navigate to="/login" state={{from:location}} replace />
         }
       return children;
      } catch(err){
            localStorage.clear();
            return <Navigate to="/login" state={{from:location}} replace />
     }
 
 
}