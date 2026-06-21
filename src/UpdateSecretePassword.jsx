import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Navbaar from "./Navbaar";
import Footer from "./Footer";
import BackButton from "./Backbutton";
import { toast } from "react-toastify";

export default function UpdateSecretePassword(){
    let navigate = useNavigate();
    let[input,setInput] = useState({
      name:"",
      emailId:"",
      oldPassword:"",
      newPassword:"",
      newSecret:"",
    })
    
    const [loading,setLoading] = useState(false);

    let handleInput = (e) =>{
      setInput((prevData) =>({
        ...prevData,
        [e.target.name] : e.target.value,
      }))
    }

    let handleSubmit =  (e) =>{
      e.preventDefault();
      const BASE_URL = import.meta.env.VITE_API_URL;
      setLoading(true);
      fetch(`${BASE_URL}/adminInfoUpdate`,{
       method:"PUT",
       headers:{
        "Content-Type":"application/json",
         "Authorization": `Bearer ${localStorage.getItem("token")}`,
       },
       body:JSON.stringify({name:input.name,emailId:input.emailId,oldPassword:input.oldPassword,newPassword:input.newPassword,newSecret:input.newSecret }),
      }).then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            if(data.success === true){
               toast.success(data.message);
            } else{
              toast.error(data.message);
            }
          setInput({
            name:"",
            emailId:"",
          oldPassword:"",
          newPassword:"",
            newSecret:"",
          })
        
        }).catch((err) =>{
          console.log("Error occur during update admin profile : ",err);
        })
         .finally(() =>setLoading(false));
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
        <Navbaar/>
        <div className="w-60 h-screen mt-2  text-center m-auto">
            <h3>Update Password Only For Admin</h3>
            <hr />
            <form onSubmit={handleSubmit}>
             <TextField id="outlined-basic"
                           label="Update Name"
                            variant="outlined" 
                            name="name"
                            value={input.name}
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
                     <TextField id="outlined-basic"
                           label="Update EmailId"
                            variant="outlined" 
                            name="emailId"
                            value={input.emailId}
                            onChange={handleInput}
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
                       <TextField id="outlined-basic"
                           label="Enter Old Password"
                            variant="outlined" 
                            name="oldPassword"
                            value={input.oldPassword}
                            onChange={handleInput}
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
                       <TextField id="outlined-basic"
                           label="Enter New Password"
                            variant="outlined" 
                            name="newPassword"
                            value={input.newPassword}
                            onChange={handleInput}
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
                     <TextField id="outlined-basic"
                           label="Update New Secret"
                            variant="outlined" 
                            name="newSecret"
                            value={input.newSecret}
                            onChange={handleInput}
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
              <Button disabled={loading}variant="contained" type="submit" style={{marginTop:"2rem" ,color:"orange"}}>{loading ? <ButtonSpinner/> : "Submit"}</Button>
              <hr />
            </form>
        </div>
        <hr />
              <div className="flex justify-center">
                  <BackButton />
              </div>
        <Footer/>
         </>
    )
   
}