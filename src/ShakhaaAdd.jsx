import Navbaar from "./Navbaar";
import Footer from "./Footer";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "./Backbutton";
import { toast } from "react-toastify";

export default function ShakhaaAdd(){
    let navigate = useNavigate();
    let[input,setInput] = useState({
        jila:"",
        nagar:"",
        basti:"",
        shakhaaName:"",
        adminName:"",
        contactNumber:0,
        address:"",
        role:"",
    })
    let[image,setImage] = useState({url:""});
    let[loading ,setLoading] = useState(false);

    // handle Inputs---
    let handleInput = (e) =>{
       setInput((prevData)=>({
        ...prevData,
        [e.target.name] :e.target.value,
       }))
    }
   
    


    // handle pictures on cloudinary--
    let handleFileUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

         const formData = new FormData();
         formData.append('file', file);
         formData.append('upload_preset', 'documents'); // Cloudinary preset
      

     try {
        //  start loader--
           setLoading(true);

           const res = await axios.post(
              'https://api.cloudinary.com/v1_1/dk3lzuvdo/raw/upload',
               formData
           );
           const uploadedUrl = res.data.secure_url;
           setImage((prev) => ({
             ...prev,
               url: res.data.secure_url,
           }));
           console.log("Uploaded:", uploadedUrl);
       } catch (err) {
            toast.error("Image upload failed 😥");
              console.log(err);
         }finally{
            // stop loader--
            setLoading(false);
         }
    };

    // handle from submit---
    let handleForm = (e) =>{
        e.preventDefault();
      fetch("https://rss-project-backend.onrender.com/shakhaaInfo",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body:JSON.stringify(input),
      }).then((res) => res.json())
        .then((data) => {
           console.log("Response:", data);
          if(data.success === false){
            toast.error(data.message);
          } else{
             toast.success(data.message);
          }
         
           setInput({
               jila: "",
               nagar: "",
               basti: "",
               shakhaaName: "",
               adminName: "",
               contactNumber: 0,
               address: "",
               role: "",
           });
           
        // //    navigate to home page--
        //    navigate("/");
      })
       .catch((err) => {
          console.error("Error:", err);
          toast.error("Something went wrong 😢");
       });
    }

    // handle submit images----
    let handleImages = (e)=>{
        e.preventDefault();
        fetch("https://rss-project-backend.onrender.com/saveShakhaaImage",{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                  "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify({url:image.url}),
        }).then((res)=>res.json())
          .then((data)=>{
            console.log(data);
            if(data.success === true){
                  toast.success(data.message);
                 } else{
                  toast.error(data.message);
                 }
            setImage({url:""});
          })
          .catch((err)=>console.log("error occur during save image...!",err));
    }
    return(
        <div>
            <Navbaar />
            <div className="flex justify-center mt-1">
                 <h1 className="text-3xl ">Create New Shakhaa</h1>
            </div>
            <hr />
            <form onSubmit={handleForm}>
            <div className="flex justify-evenly items-center">
             
                <div>
                   <TextField id="outlined-basic" 
                   label="Enter Jila Name" variant="outlined"
                   name="jila" value={input.jila} onChange={handleInput}
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
                    name="nagar" value={input.nagar} onChange={handleInput}
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
                    name="basti" value={input.basti} onChange={handleInput}
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
                    name="shakhaaName" value={input.shakhaaName} onChange={handleInput}
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
                  name="adminName" value={input.adminName} onChange={handleInput}
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
                   name="contactNumber" value={input.contactNumber} onChange={handleInput}
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
                    name="address" value={input.address} onChange={handleInput}
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
                    name="role" value={input.role} onChange={handleInput}
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
                  <Button variant="contained"  type="submit" style={{marginTop:"2rem" ,color:"orange"}}>Submit</Button>
              </div>
        </form>
         <hr />
         <form onSubmit={handleImages}>
             <div  className="flex justify-center items-center">
                 <label htmlFor="Upload Image">
                         <input
                             style={{ display: 'none' }}
                             id="Upload Image"
                             type="file"
                             accept="image/*"
                             onChange={handleFileUpload}
                           />
                        <Button variant="outlined" component="span" sx={{
                            color: '#f6ad55',
                            mt:2,
                             borderColor: '#f4a261',
                             '&:hover': {
                             borderColor: '#fb923c',
                            backgroundColor: '#fff7ed' },}}>Upload Picture </Button>
                </label>
                <hr />
              {loading ? (
                          <div className="flex justify-center mt-4">
                            <div className="animate-spin h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full"></div>
                            </div>
                         ) : image.url && (
                           <div className="flex justify-center mt-4">
                                <img
                                   src={image.url}
                                   alt="Uploaded preview"
                                   style={{ width: "80%", maxHeight: "500px", objectFit: "contain" }}
                              />
                            </div>
            )}

            </div>
              <hr />
              <div className="flex justify-center">
                  <Button variant="contained"  type="submit" style={{marginTop:"2rem" ,color:"orange"}}>Submit</Button>
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