import Navbaar from "./Navbaar";
import Footer from "./Footer";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import BackButton from "./Backbutton";
import { toast } from "react-toastify";

export default function Login(){
   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || "/"; // default
   const [loading,setLoading] = useState(false);

   let[input ,setInput] = useState({
      emailId:"",
      password:"",
   });
   let[Msg,setMsg] = useState("");
   // handle Input-----
   let handleInput = (e) =>{
       setInput((prevData)=>({
         ...prevData,
         [e.target.name] : e.target.value,
       }))
   }
   // handle Form on Submit----
   let handleSubmit = (e) =>{
      e.preventDefault();
      const BASE_URL = import.meta.env.VITE_API_URL;
      setLoading(true);
      fetch(`${BASE_URL}/login`,{
         method:"POST",
         headers:{
            'Content-Type':"application/json"
         },
         body:JSON.stringify(input),
      }).then((res)=>res.json())
        .then((data)=>{
         console.log(data);
            // Store token in localStorage (or cookies)
                if (data.token) {
                   localStorage.setItem("token", data.token);
                   localStorage.setItem("role", data.user.role);
                   localStorage.setItem("name", data.user.name);
                   localStorage.setItem("emailId",data.user.emailId)
                  //  go back to intended page-----
                     toast.success(data.message);
                 navigate(from, { replace: true });
               } else {
                     toast.error(data.message); // show error
                  }
      
         setInput({emailId:"",password:""});
        }).catch((err)=>console.log("error occur during fetch login data :",err))
        .finally(()=>{setLoading(false)});
   }

   // 🔄 रियूजेबल बटन स्पिनर कंपोनेंट (ताकि कोड साफ सुथरा रहे)
  const ButtonSpinner = () => (
    <svg className="animate-spin h-5 w-5 text-white inline mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
    return(
       <>
       <Navbaar />
       <div className="w-60 h-80 mt-2  text-center m-auto">
              <h2 className="text-4xl">--Login--</h2>
              <hr />
               {Msg && <p className="text-green-600 mt-2">{Msg}</p>}
            <form onSubmit={handleSubmit} >
              <hr />
              <TextField id="outlined-basic"
               label="enter emailId"
                variant="outlined" 
                name="emailId"
                value={input.emailId}
                onChange={handleInput}
               style={{marginTop:"2rem"}}
              sx={{
                          
                      width: '100%',
                      '& label.Mui-focused': {
                      color: '#f6ad55',
                       },
                    '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                             borderColor: '#f4a261', // default
                                },
                            '&:hover fieldset': {
                            borderColor: '#fb923c', // hover (slightly darker)
                                },
                           '&.Mui-focused fieldset': {
                            borderColor: '#f6ad55', // focus - light kesari
                                },
                           },
                        }}
                />
              <hr />
              <TextField id="outlined-basic"
               label="enter password"
                variant="outlined" 
                type="password"
                 name="password"
                value={input.password}
                onChange={handleInput}
                  style={{marginTop:"2rem"}}
                   sx={{
                          
                      width: '100%',
                      '& label.Mui-focused': {
                      color: '#f6ad55',
                       },
                    '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                             borderColor: '#f4a261', // default
                                },
                            '&:hover fieldset': {
                            borderColor: '#fb923c', // hover (slightly darker)
                                },
                           '&.Mui-focused fieldset': {
                            borderColor: '#f6ad55', // focus - light kesari
                                },
                           },
                        }}
                />
              <hr />
              <Button 
              disabled={loading}
              variant="contained" type="submit" style={{marginTop:"2rem" ,color:"orange"}}
              > {loading?<ButtonSpinner/>:"submit"}
              </Button>
              <hr />
            </form>
       </div>
       <hr />
             <div className="flex justify-center">
                 <BackButton />
             </div>
       <Footer />
       </>
    )
}