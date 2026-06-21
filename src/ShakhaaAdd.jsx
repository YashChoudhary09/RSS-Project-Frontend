import Navbaar from "./Navbaar";
import Footer from "./Footer";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "./Backbutton";
import { toast } from "react-toastify";

export default function ShakhaaAdd() {
  let navigate = useNavigate();
  let [input, setInput] = useState({
    vibhaag:"",
    jila: "",
    nagar: "",
    basti: "",
    shakhaaName: "",
    adminName: [],
    contactNumber: [],
    address: [],
    role: [],
  });
  let [image, setImage] = useState({ url: "" });
  let [loading, setLoading] = useState(false);

  // handle Inputs---
  let handleInput = (e) => {
    setInput((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // handle pictures on cloudinary--
  let handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "documents"); // Cloudinary preset

    try {
      //  start loader--
      setLoading(true);

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dk3lzuvdo/raw/upload",
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
    } finally {
      // stop loader--
      setLoading(false);
    }
  };

  // handle from submit---
  let handleForm = (e) => {
    e.preventDefault();
    const BASE_URL = import.meta.env.VITE_API_URL;
    setLoading(true);
    fetch(`${BASE_URL}/shakhaaInfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response:", data);
        if (data.success === false) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
        }

        setInput({
          vibhaag:"",
          jila: "",
          nagar: "",
          basti: "",
          shakhaaName: "",
          adminName: [],
          contactNumber: [],
          address: [],
          role: [],
        });

        // //    navigate to home page--
        //    navigate("/");
      })
      .catch((err) => {
        console.error("Error:", err);
        toast.error("Something went wrong 😢");
      })
      .finally(()=>setLoading(false));
  };

  // handle submit images----
  let handleImages = (e) => {
    e.preventDefault();
    const BASE_URL = import.meta.env.VITE_API_URL;
    setLoading(true);
    fetch(`${BASE_URL}/saveShakhaaImage`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ url: image.url }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success === true) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        setImage({ url: "" });
      })
      .catch((err) => console.log("error occur during save image...!", err))
      .finally(()=>setLoading(false));
  };

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
  return (
   
  <div>
    <Navbaar />
    <div className="flex justify-center mt-1">
      <h1 className="text-3xl">नयी शाखा बनायें </h1>
    </div>
    <hr />
    <div className="flex flex-end ">
      <BackButton />
    </div>
    {/* Main Form */}
    <form onSubmit={handleForm}>
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
           कार्यकर्ता 
            </Button>
            <Button variant="outlined" onClick={addContactNumbers} color="primary">
           सम्पर्क 
            </Button>
            <Button variant="outlined" onClick={addAddress} color="primary">
             पता
            </Button>
            <Button variant="outlined" onClick={addRole} color="primary">
            दायित्व 
            </Button>
          </div>

          {/* Grid Layout for Dynamic Sections */}
          <div className="grid grid-cols-2 gap-6">
            {/* Admins */}
            <div>
              <h2 className="text-lg font-semibold mb-2">कार्यकर्ता</h2>
              {input.adminName.map((admin, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <TextField
                    label={`कार्यकर्ता ${index + 1}`}
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
                    label={`सम्पर्क ${index + 1}`}
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
                    label={`पता ${index + 1}`}
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
                    label={`दायित्व ${index + 1}`}
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
        <Button
        disabled={loading}
        variant="contained" type="submit" style={{ marginTop: "2rem", color: "orange" }}>
         {loading ? <ButtonSpinner/> : "Submit"}
        </Button>
      </div>
    </form>

    {/* Image Upload Form */}
    <hr />
    <form onSubmit={handleImages}>
      <div className="flex flex-col items-center">
        <label htmlFor="Upload Image">
          <input
            style={{ display: "none" }}
            id="Upload Image"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
          />
          <Button
            variant="outlined"
            component="span"
            disabled={loading}
            sx={{
              color: "#f6ad55",
              mt: 2,
              borderColor: "#f4a261",
              "&:hover": { borderColor: "#fb923c", backgroundColor: "#fff7ed" },
            }}
          >
        {loading ? <ButtonSpinner/> : "यादें सहेजे "}  
          </Button>
        </label>

        {loading ? (
          <div className="animate-spin h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full mt-4"></div>
        ) : (
          image.url && (
            <div className="mt-4">
              <img
                src={image.url}
                alt="Uploaded preview"
                style={{ width: "80%", maxHeight: "500px", objectFit: "contain" }}
              />
            </div>
          )
        )}
      </div>
      <div className="flex justify-center">
        <Button 
        disabled={loading} 
        variant="contained" type="submit" style={{ marginTop: "2rem", color: "orange" }}>
            {loading ? <ButtonSpinner/> : "Submit"}
        </Button>
      </div>
    </form>
    <hr />
    <Footer />
  </div>
);

  
}
