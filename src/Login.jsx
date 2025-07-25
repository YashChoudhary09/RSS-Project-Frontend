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
        }).catch((err)=>console.log("error occur during fetch login data :",err));
   }
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
              <Button variant="contained" type="submit" style={{marginTop:"2rem" ,color:"orange"}}>Submit</Button>
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