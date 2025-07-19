import { useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbaar from "./Navbaar";
import Footer from "./Footer";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BackButton from "./Backbutton";
import { toast } from "react-toastify";


export default function Editshakhaa(){
    let navigate = useNavigate();
   let {id } = useParams();
   let[input,setInput] = useState({
    jila: "", nagar: "", basti: "", shakhaaName: "",
    adminName: "", contactNumber: "", address: "", role: ""
   });

//    find shakhaa----
     useEffect(() =>{
        fetch(`https://rss-project-backend.onrender.com/findOneShakhaa/${id}`,{
            method:"GET",
            headers:{
                  "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        }).then((res) =>res.json())
          .then((data)=>{
             if (data.access === false) {
                 toast.error(data.message);
                 navigate("/allShakhaa"); // ya kahin aur le jao
                return;
              }
            if (!data.foundedShakhaa) {
                toast.error("Shakhaa not found!");
               return;
             }
            setInput(data.foundedShakhaa)
          })
     },[id])

// update shakhaa---
let handleUpdate = (e) =>{
 e.preventDefault();

  fetch(`https://rss-project-backend.onrender.com/updateShakhaa/${id}`,{
    method:"PUT",
    headers:{
        "Content-Type":"application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body:JSON.stringify({input}),
  }).then((res)=> res.json())
     .then(data => {
        if(data.success === true){
                  toast.success(data.message);
                 } else{
                  toast.error(data.message);
                 }
      navigate("/allShakhaa");
      })
      .catch(err => console.error("Update error", err));
}

   return(
    <>
    <Navbaar/>
    <div>
          <div className="flex justify-center mt-1">
                 <h1 className="text-3xl ">Update Shakhaa</h1>
            </div>
            <hr />
        <form onSubmit={handleUpdate}>
            <div className="flex justify-evenly items-center">
                         
                            <div>
                               <TextField id="outlined-basic" 
                               label="Enter Jila Name" variant="outlined"
                                value={input.jila} onChange={(e) => setInput({ ...input, jila: e.target.value })} 
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
                               label="Enter nagar" variant="outlined"
                                value={input.nagar} onChange={(e) => setInput({ ...input, nagar: e.target.value })} 
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
                                label="Enter basti" variant="outlined"
                               value={input.basti} onChange={(e) => setInput({ ...input, basti: e.target.value })} 
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
                                label="Enter shakhaa-name" variant="outlined"
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
                               <hr />
                            </div>
                            <div>
                              <TextField id="outlined-basic" 
                              label="enter karykerta-name" variant="outlined"
                           value={input.adminName} onChange={(e) => setInput({ ...input, adminName: e.target.value })}
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
                               label="Enter contact-number" variant="outlined"
                              value={input.contactNumber} onChange={(e) => setInput({ ...input, contactNumber: e.target.value })}
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
                               label="Enter address" variant="outlined" 
                              value={input.address} onChange={(e) => setInput({ ...input, address: e.target.value })} 
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
                                label="Enter role" variant="outlined"
                             value={input.role} onChange={(e) => setInput({ ...input, role: e.target.value })} 
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