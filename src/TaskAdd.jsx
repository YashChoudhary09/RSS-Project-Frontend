import Navbaar from "./Navbaar";
import Footer from "./Footer";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";
import { useNavigate}  from "react-router-dom";
import BackButton from "./Backbutton";
import { toast } from "react-toastify";

export default function TaskAdd(){
    let naviagte = useNavigate();
    let [input ,setInput] = useState({
        title:"",
        description:"",
        shakhaaName:"",
    })

    const [loading,setLoading] = useState(false);

    // handle inputs--
    let handleinput = (e) =>{
       setInput((prevData)=>({
        ...prevData,
        [e.target.name] :e.target.value,
       }))
    }

    
        // handel form submission--
        let handleSubmit = (e) =>{
            e.preventDefault();
            const BASE_URL = import.meta.env.VITE_API_URL;
            setLoading(true);
            fetch(`${BASE_URL}/task`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                     "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body:JSON.stringify(input),
            }).then((res)=>res.json())
              .then((data)=>{
                console.log(data);
                if(data.success === true){
                  toast.success(data.message);
                 } else{
                  toast.error(data.message);
                 }
                setInput({
                    title:"",
                    description:"",
                    shakhaaName:"",
                });
                setLoading(false);
                // // navigate to home page --
                // naviagte("/");
              })
        }

         // 🔄 रियूजेबल बटन स्पिनर कंपोनेंट (ताकि कोड साफ सुथरा रहे)
  const ButtonSpinner = () => (
    <svg className="animate-spin h-5 w-5 text-white inline mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
    return(
        <div>
            <Navbaar />
            <div className="flex justify-center mt-1">
                 <h1 className="text-3xl ">कार्य जोङे</h1>
            </div>
            <hr />
            <form onSubmit={handleSubmit}>
            <div className="flex justify-evenly items-center">
             
                <div>
                   <TextField id="outlined-basic" 
                   label="शीर्षक" variant="outlined"
                   name="title" value={input.title} onChange={handleinput}
                    sx={{
                       mt:2,   
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
                   label="विवरण" variant="outlined"
                  name="description" value={input.description} onChange={handleinput}
                    sx={{
                       mt:2,   
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
                   label="शाखा" variant="outlined"
                  name="shakhaaName" value={input.shakhaaName} onChange={handleinput}
                    sx={{
                       mt:2,   
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
                    </div>
            </div>
              <div className="flex justify-center">
                  <Button
                  disabled={loading}
                  variant="contained"  type="submit"  style={{marginTop:"2rem" ,color:"orange"}}>{loading ? <ButtonSpinner/> : "Submit"}</Button>
              </div>
             </form>
                 
              <hr />
                    <div className="flex justify-center">
                        <BackButton />
                    </div>
          
            <Footer />
        </div>
    )
}