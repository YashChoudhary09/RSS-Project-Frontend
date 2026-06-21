import Navbaar from "./Navbaar";
import Footer from "./Footer";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "./Backbutton";
import { toast } from "react-toastify";

export default function SignUp(){
   let navigate = useNavigate();
   let location = useLocation();
   const from = location.state?.from?.pathname || "/";
   let[input,setInput] = useState({
      name:"",
      emailId:"",
      password:"",
   })
   let [Msg, setMsg] = useState("");
     const [loading,setLoading] = useState(false);
   
   // handle inputs----
   let handleInputs = (e) =>{
      setInput((prevData)=>({
        ...prevData,
         [e.target.name]:e.target.value,
      }))
   }
   // handle formSubmition----
   let handleSubmit = (e)=>{
      e.preventDefault();
      const BASE_URL = import.meta.env.VITE_API_URL;
      setLoading(true);
     fetch(`${BASE_URL}/register`,{
      method:"POST",
      headers:{
         "Content-Type":"application/json",
      },
      body:JSON.stringify(input),
      
     })
       .then((res)=>res.json())
       .then((data)=>{
         if(data.success === true){
            localStorage.setItem("token",data.token);
            localStorage.setItem("name",data.name);
            localStorage.setItem("role",data.role);
            localStorage.setItem("emailId",data.emailId);
            // naviagte to home page
            toast.success("Registration successful! Welcome to the Sangh 💖");
            navigate(from || "/");
         }  else {
                     toast.error(data.message); // show error
                  }
        
       })
       .catch((err)=> console.log("error during fetch signUp data....",err))
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
       <div className="w-60 h-96   text-center m-auto">
              <h2 className="text-4xl">--Sign Up--</h2>
              {Msg && <p className="text-green-600 mt-2">{Msg}</p>}
              <hr />
            <form onSubmit={handleSubmit}>
               <TextField id="outlined-basic"
               label="Enter Name"
                variant="outlined" 
                type="text"
                name="name"
                value={input.name}
                onChange={handleInputs}
               style={{marginTop:"1.5rem"}}
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
               label="Enter EmailId"
                variant="outlined" 
                 name="emailId"
                value={input.emailId}
                onChange={handleInputs}
               style={{marginTop:"1rem"}}
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
               label="Enter Password"
                variant="outlined" 
                  type="password"
                   name="password"
                value={input.password}
                onChange={handleInputs}
                  style={{marginTop:"1rem"}}
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
                <hr />
              <Button 
              disabled={loading}
              variant="contained"type="Submit" style={{marginTop:"1rem" ,color:"orange"}}
              >{loading?<ButtonSpinner/>:"submit"}</Button>
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