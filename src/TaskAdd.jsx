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
                })
                // // navigate to home page --
                // naviagte("/");
              })
        }
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
                  <Button variant="contained"  type="submit"  style={{marginTop:"2rem" ,color:"orange"}}>Submit</Button>
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