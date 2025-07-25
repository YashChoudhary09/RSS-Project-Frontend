import { useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbaar from "./Navbaar";
import Footer from "./Footer";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BackButton from "./Backbutton";
import { toast } from "react-toastify";


export default function EditTask(){
    let navigate = useNavigate();
   let {id } = useParams();
   let[input,setInput] = useState({
      title:"", description:"",shakhaaName:"",
   });

//    find shakhaa----
     useEffect(() =>{
      const BASE_URL = import.meta.env.VITE_API_URL;
        fetch(`${BASE_URL}/findOneTask/${id}`,{
            method:"GET",
            headers:{
                  "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        }).then((res) =>res.json())
          .then((data)=>{
             if (data.success === false) {
                 toast.error(data.message);
                 navigate("/allTask"); // ya kahin aur le jao
                return;
              }
            if (!data.foundedTask) {
                toast.error("Task not found!");
               return;
             }
            setInput(data.foundedTask)
          })
     },[id])

// update shakhaa---
let handleUpdate = (e) =>{
 e.preventDefault();

 const BASE_URL = import.meta.env.VITE_API_URL;
  fetch(`${BASE_URL}/editTask/${id}`,{
    method:"PUT",
    headers:{
        "Content-Type":"application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body:JSON.stringify({input}),
  }).then((res)=> res.json())
     .then(data => {
        toast.success(data.message || "Task updated successfully");
      navigate("/allTask");
      })
      .catch(err => console.error("Update error", err));
}

   return(
    <>
    <Navbaar/>
    <div>
          <div className="flex justify-center mt-1">
                 <h1 className="text-3xl ">कार्य का नवीनीकरण</h1>
            </div>
            <hr />
        <form onSubmit={handleUpdate}>
            <div className="flex justify-evenly items-center">
                         
                            <div>
                               <TextField id="outlined-basic" 
                               label="शीर्षक" variant="outlined"
                                value={input.title} onChange={(e) => setInput({ ...input, title: e.target.value })} 
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
                                value={input.description} onChange={(e) => setInput({ ...input, description: e.target.value })} 
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
                               value={input.shakhaaName} onChange={(e) => setInput({ ...input, shakhaaName: e.target.value })} 
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
                       <hr />
                          <div className="flex justify-center">
                              <Button variant="contained"  type="submit" style={{marginTop:"2rem" ,color:"orange"}}>Update</Button>
                          </div>
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