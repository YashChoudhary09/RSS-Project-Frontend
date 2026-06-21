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
     const [loading,setLoading] = useState(false);

//    find shakhaa----
     useEffect(() =>{
      const BASE_URL = import.meta.env.VITE_API_URL;
      setLoading(true);
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
            setLoading(false);
          })
     },[id])

// update shakhaa---
let handleUpdate = (e) =>{
 e.preventDefault();

 const BASE_URL = import.meta.env.VITE_API_URL;
 setLoading(true);
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
      .catch(err => console.error("Update error", err))
      .finally(()=>setLoading(false))
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
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg font-bold text-orange-600 animate-bounce">
            लोडिंग हो रहा है...
          </div>
        </div>
      )}
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
                              <Button
                              disabled={loading}
                              variant="contained"  type="submit" style={{marginTop:"2rem" ,color:"orange"}}>{loading ? <ButtonSpinner/> : "Update"}</Button>
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