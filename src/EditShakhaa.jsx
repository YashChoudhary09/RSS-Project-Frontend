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
    vibhaag:"",jila: "", nagar: "", basti: "", shakhaaName: "",
    adminName: [], contactNumber: [], address: [], role: []
   });
   const [loading,setLoading] = useState(false);

    // handle Inputs---
  let handleInput = (e) => {
    setInput((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
//    find shakhaa----
     useEffect(() =>{
      const BASE_URL = import.meta.env.VITE_API_URL;
        setLoading(true);
        fetch(`${BASE_URL}/findOneShakhaa/${id}`,{
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
            setLoading(false);
          })
     },[id])

// update shakhaa---
let handleUpdate = (e) =>{
 e.preventDefault();
  
 const BASE_URL = import.meta.env.VITE_API_URL;
 setLoading(true);
  fetch(`${BASE_URL}/updateShakhaa/${id}`,{
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
                    navigate("/allShakhaa");
                 } else{
                  toast.error(data.message);
                 }
    
      })
      .catch(err => console.error("Update error", err))
      .finally(() => setLoading(false));
}
// handle admins----
  let addAdmin = () => {
    setInput((prev) => ({
      ...prev,
      adminName: [...prev.adminName, ""],
    }));
  };
  let handleAdminChange = (e, index) => {
    const values = [...input.adminName];
    values[index] = e.target.value;
    setInput((prev) => ({
      ...prev,
      adminName: values,
    }));
  };
  let removeAdmin = (index) => {
    const values = [...input.adminName];
    values.splice(index, 1);
    setInput((prev) => ({
      ...prev,
      adminName: values,
    }));
  };
  // handle contactNumbers --
  let addContactNumbers = () => {
    setInput((prevData) => ({
      ...prevData,
      contactNumber: [...prevData.contactNumber, 0],
    }));
  };
  let handleContactChange = (e, index) => {
    const values = [...input.contactNumber];
    values[index] = e.target.value;
    setInput((prev) => ({
      ...prev,
      contactNumber: values,
    }));
  };
  let removeContactNumber = (index) => {
    const values = [...input.contactNumber];
    values.splice(index, 1);
    setInput((prev) => ({
      ...prev,
      contactNumber: values,
    }));
  };
  //  handle address-
  let addAddress = () => {
    setInput((prev) => ({
      ...prev,
      address: [...prev.address, " "],
    }));
  };
  let handleAddressChange = (e, index) => {
    const values = [...input.address];
    values[index] = e.target.value;
    setInput((prev) => ({
      ...prev,
      address: values,
    }));
  };
  let removeAddress = (index) => {
    const values = [...input.address];
    values.splice(index, 1);
    setInput((prev) => ({
      ...prev,
      address: values,
    }));
  };
  //  handle role-
  let addRole = () => {
    setInput((prev) => ({
      ...prev,
      role: [...prev.role, " "],
    }));
  };
  let handleRoleChange = (e, index) => {
    const values = [...input.role];
    values[index] = e.target.value;
    setInput((prev) => ({
      ...prev,
      role: values,
    }));
  };
  let removeRole = (index) => {
    const values = [...input.role];
    values.splice(index, 1);
    setInput((prev) => ({
      ...prev,
      role: values,
    }));
  };

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
                 <h1 className="text-3xl ">शाखा का नवीनीकरण</h1>
            </div>
            <hr />
             <form onSubmit={handleUpdate}>
                  <div className="flex flex-col lg:flex-row lg:justify-evenly lg:items-start gap-8 mt-4">
                    {/* Left Section (Basic Info) */}
                    <div className="w-full lg:w-1/2">
                       <TextField
                        label="विभाग"
                        variant="outlined"
                        name="vibhaag"
                        value={input.vibhaag}
                        onChange={handleInput}
                        fullWidth
                        sx={{
                          mt: 2,
                          "& label.Mui-focused": { color: "#f6ad55" },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#f4a261" },
                            "&:hover fieldset": { borderColor: "#fb923c" },
                            "&.Mui-focused fieldset": { borderColor: "#f6ad55" },
                          },
                        }}
                      />
                      <TextField
                        label="जिला"
                        variant="outlined"
                        name="jila"
                        value={input.jila}
                        onChange={handleInput}
                        fullWidth
                        sx={{
                          mt: 2,
                          "& label.Mui-focused": { color: "#f6ad55" },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#f4a261" },
                            "&:hover fieldset": { borderColor: "#fb923c" },
                            "&.Mui-focused fieldset": { borderColor: "#f6ad55" },
                          },
                        }}
                      />
                      <TextField
                        label="नगर"
                        variant="outlined"
                        name="nagar"
                        value={input.nagar}
                        onChange={handleInput}
                        fullWidth
                        sx={{
                          mt: 2,
                          "& label.Mui-focused": { color: "#f6ad55" },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#f4a261" },
                            "&:hover fieldset": { borderColor: "#fb923c" },
                            "&.Mui-focused fieldset": { borderColor: "#f6ad55" },
                          },
                        }}
                      />
                      <TextField
                        label="बस्ती"
                        variant="outlined"
                        name="basti"
                        value={input.basti}
                        onChange={handleInput}
                        fullWidth
                        sx={{
                          mt: 2,
                          "& label.Mui-focused": { color: "#f6ad55" },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#f4a261" },
                            "&:hover fieldset": { borderColor: "#fb923c" },
                            "&.Mui-focused fieldset": { borderColor: "#f6ad55" },
                          },
                        }}
                      />
                      <TextField
                        label="शाखा"
                        variant="outlined"
                        name="shakhaaName"
                        value={input.shakhaaName}
                        onChange={handleInput}
                        fullWidth
                        sx={{
                          mt: 2,
                          "& label.Mui-focused": { color: "#f6ad55" },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#f4a261" },
                            "&:hover fieldset": { borderColor: "#fb923c" },
                            "&.Mui-focused fieldset": { borderColor: "#f6ad55" },
                          },
                        }}
                      />
                    </div>
            
                    {/* Right Section (Dynamic Fields) */}
                    <div className="w-full lg:w-1/2">
                      {/* Buttons Row */}
                      <div className="flex flex-wrap gap-3 mb-4">
                        <Button variant="outlined" onClick={addAdmin} color="primary">
                         कार्य़कर्ता जोडे़
                        </Button>
                        <Button variant="outlined" onClick={addContactNumbers} color="primary">
                        सम्पर्क जोडे़
                        </Button>
                        <Button variant="outlined" onClick={addAddress} color="primary">
                       पता जोडे़
                        </Button>
                        <Button variant="outlined" onClick={addRole} color="primary">
                       दायित्व जोडे़
                        </Button>
                      </div>
            
                      {/* Grid Layout for Dynamic Sections */}
                      <div className="grid grid-cols-2 gap-6">
                        {/* Admins */}
                        <div>
                          <h2 className="text-lg font-semibold mb-2">कार्य़कर्ता</h2>
                          {input.adminName.map((admin, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                              <TextField
                                label={`Admin ${index + 1}`}
                                value={admin}
                                onChange={(e) => handleAdminChange(e, index)}
                                fullWidth
                              />
                              <Button color="error" onClick={() => removeAdmin(index)}>
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
            
                        {/* Contact Numbers */}
                        <div>
                          <h2 className="text-lg font-semibold mb-2">सम्पर्क</h2>
                          {input.contactNumber.map((num, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                              <TextField
                                label={`Number ${index + 1}`}
                                value={num}
                                onChange={(e) => handleContactChange(e, index)}
                                fullWidth
                              />
                              <Button color="error" onClick={() => removeContactNumber(index)}>
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
            
                        {/* Addresses */}
                        <div>
                          <h2 className="text-lg font-semibold mb-2">पता</h2>
                          {input.address.map((addr, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                              <TextField
                                label={`Address ${index + 1}`}
                                value={addr}
                                onChange={(e) => handleAddressChange(e, index)}
                                fullWidth
                              />
                              <Button color="error" onClick={() => removeAddress(index)}>
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
            
                        {/* Roles */}
                        <div>
                          <h2 className="text-lg font-semibold mb-2">दायित्व</h2>
                          {input.role.map((role, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                              <TextField
                                label={`Role ${index + 1}`}
                                value={role}
                                onChange={(e) => handleRoleChange(e, index)}
                                fullWidth
                              />
                              <Button color="error" onClick={() => removeRole(index)}>
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
            
       <hr />
                          <div className="flex justify-center">

                              <Button variant="contained" 
                              disabled={loading}
                              type="submit" style={{marginTop:"2rem" ,color:"orange"}}>{loading ? <ButtonSpinner/> : "Update"}</Button>
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