import React, { useState, useEffect, useRef } from "react";
import Navbaar from "./Navbaar";
import Footer from "./Footer";
import BackButton from "./Backbutton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import PrintAllShakhaa from "./PrintAllShakhaa";

export default function AllShakhaa() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const componentRef = useRef(null);
  const userRole = localStorage.getItem("role");
  const [loading,setLoading] = useState(false);

  const handlePrint = useReactToPrint({
    contentRef: componentRef, // 👈 v3 way
    documentTitle: "All-Shakhaa-Report",
    onAfterPrint: () => console.log("Printed All Shakhaa."),
    onPrintError: (err) => {
      console.error("Print error:", err);
      toast.error("Print failed!");
    },
  });

  // Debug check
  useEffect(() => {
    console.log("Print Ref on mount:", componentRef.current);
  }, [data]);

 // Fetching data
  useEffect(() => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    setLoading(true);

    // दोनों APIs को एक साथ हैंडल करने के लिए Promise.all का उपयोग करना बेहतर है ताकि लोडिंग सही समय पर बंद हो
    Promise.all([
      fetch(`${BASE_URL}/allShakhaaInfo`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }).then((res) => res.json()),
      
      fetch(`${BASE_URL}/allshakhaaImages`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }).then((res) => res.json())
    ])
      .then(([shakhaaData, imageData]) => {
        // Handle Shakhaa Info
        if (shakhaaData.success) {
          setData(shakhaaData.allShakhaa);
        } else {
          toast.error(shakhaaData.message);
        }

        // Handle Images
        if (imageData.success) {
          setImages(imageData.images);
        } else {
          toast.error(imageData.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        toast.error("डेटा लोड करने में समस्या आई!");
      })
      .finally(() => {
        setLoading(false); // 👈 यहाँ पर सही तरीके से लोडिंग बंद होगी, चाहे सक्सेस हो या एरर
      });
  }, []);
  // handle serach--
  

  // Delete shakhaa
  const handleDelete = async (id) => {
    const BASE_URL = import.meta.env.VITE_API_URL;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this shakhaa?"
    );
    if (!confirmDelete) return;
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/deleteShakhaa/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await res.json();
      if (result.success === false) {
        toast.error(result.message);
      } else {
        toast.success(result.message || "Deleted successfully");
        setData((prev) => prev.filter((item) => item._id !== id));
      } 
      
    } catch (err) {
      console.error("Error deleting shakhaa:", err);
      toast.error("Failed to delete 😥");
    } finally{
        setLoading(false);
  }};

  // search shakhaa--
 const handleSearch = (name) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  
  // 1. अगर इनपुट पूरी तरह खाली है (या सिर्फ स्पेस है)
  if (!name || !name.trim()) {
    setLoading(true);
    
    fetch(`${BASE_URL}/allShakhaaInfo`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // 👈 टोकन भेजना ज़रूरी है
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Re-fetched all data:", data); // डिबग के लिए
        if (data.success && data.allShakhaa) {
          setData(data.allShakhaa); // 👈 सभी शाखाएं वापस स्टेट में सेट होंगी
        } else {
          toast.error(data.message || "डेटा लोड करने में विफल");
        }
      })
      .catch((err) => {
        console.error("Error re-fetching all shakhaa:", err);
        toast.error("नेटवर्क त्रुटि!");
      })
      .finally(() => {
        setLoading(false);
      });
    return; // फंक्शन को यहीं रोक दें
  }

  // 2. अगर इनपुट में कुछ लिखा है, तो सर्च API चलाएं
  setLoading(true);
  fetch(`${BASE_URL}/findShakhaa/${name}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // यहाँ भी टोकन सुरक्षित रखें
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success === true && data.foundedShakhaa) {
        setData(data.foundedShakhaa);
      } else {
        // यदि कोई शाखा नहीं मिली, तो डेटा खाली करें ताकि स्क्रीन पर पुराना डेटा न दिखे
        setData([]); 
      }
    })
    .catch((err) => {
      console.error("Error during search shakhaa:", err);
    })
    .finally(() => {
      setLoading(false);
    });
};
  // Delete image
  const handleDeleteImage = async (id) => {
    const BASE_URL = import.meta.env.VITE_API_URL;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this picture?"
    );
    if (!confirmDelete) return;
      setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/deleteShakhaa/images/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
      } else {
        toast.success(data.message || "Deleted successfully");
        setImages((prev) => prev.filter((img) => img._id !== id));
        setSelectedImage(null);
      } 
    } catch (err) {
      toast.error("Image delete failed 😥");
      console.error(err);
    } finally{
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editShakhaa/${id}`);
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
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg font-bold text-orange-600 animate-bounce">
            लोडिंग हो रहा है...
          </div>
        </div>
      )}
      <div className="p-4">
        <h2 className="text-3xl text-center font-bold mb-6 text-orange-500">
        -- सभी शाखाय़े --
        </h2>
       <div className="flex justify-between">
              {userRole === "admin" && (
          <button
            onClick={handlePrint}
            disabled={!componentRef.current}
            className={`px-4 py-2 rounded-md transition mb-2 ${
              componentRef.current
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            {" "}
            Print All Shakhaa
          </button>
        )}
             <input
  type="text"
  placeholder="🔍 शाखा का नाम लिखें..."
  onChange={(e) => handleSearch(e.target.value)}
  className="border border-orange-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
/>


       </div>
      
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-4 mb-6 border border-orange-200 hover:shadow-xl transition-shadow duration-300 relative"
          >
            {/* Shakhaa Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-4 text-center">
              <h3 className="text-lg font-semibold text-orange-600">
               शाखा:{" "}
                <span className="text-blue-700 font-bold">
                  {item.shakhaaName}
                </span>
              </h3>
              <h3 className="text-lg font-semibold text-orange-600">
                विभाग:{" "}
                <span className="text-blue-700 font-bold">
                  {item.vibhaag}
                </span>
              </h3>
              <h3 className="text-lg font-semibold text-orange-600">
                जिला:{" "}
                <span className="text-blue-700 font-bold">{item.jila}</span>
              </h3>
              <h3 className="text-lg font-semibold text-orange-600">
                नगर:{" "}
                <span className="text-blue-700 font-bold">{item.nagar}</span>
              </h3>
              <h3 className="text-lg font-semibold text-orange-600">
                बस्ती:{" "}
                <span className="text-blue-700 font-bold">{item.basti}</span>
              </h3>
            </div>

            {/* Table-Like Layout for Admin, Contact, Role, Address */}
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="grid grid-cols-4 text-center font-medium bg-orange-100 border-b border-gray-300">
                <p className="py-2 border-r border-gray-300">कार्यकर्ता</p>
                <p className="py-2 border-r border-gray-300">संपर्क</p>
                <p className="py-2 border-r border-gray-300">दायित्व</p>
                <p className="py-2">पता</p>
              </div>

              {/* Aligning rows under each column */}
              <div className="grid grid-cols-4 text-center text-gray-700">
                <div className="border-r border-gray-300">
                  {item.adminName.map((admin, i) => (
                    <p key={i} className="py-2 border-b border-gray-200">
                      {admin}
                    </p>
                  ))}
                </div>
                <div className="border-r border-gray-300">
                  {item.contactNumber.map((num, i) => (
                    <p key={i} className="py-2 border-b border-gray-200">
                      {num}
                    </p>
                  ))}
                </div>
                <div className="border-r border-gray-300">
                  {item.role.map((role, i) => (
                    <p key={i} className="py-2 border-b border-gray-200">
                      {role}
                    </p>
                  ))}
                </div>
                <div>
                  {item.address.map((addr, i) => (
                    <p key={i} className="py-2 border-b border-gray-200">
                      {addr}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            {/* Edit & Delete Buttons at Top-Right */}
            <div className=" flex gap-3 justify-center mt-2">
           
              <button
                onClick={() => handleEdit(item._id)}
                disabled={loading}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              > {loading ? <ButtonSpinner /> : "✏️ Edit"}
                {/* {loading ? "Wait...":"✏️ Edit"} */}
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                disabled={loading}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >  {loading ? <ButtonSpinner /> : "🗑️ Delete"}
                 {/* {loading ? "Deleting...":"🗑️ Delete"} */}
              </button>
            </div>
          </div>
        ))}

        {/* Hidden print content */}
        <div style={{ position: "absolute", top: "-10000px" }}>
          <PrintAllShakhaa ref={componentRef} data={data} />
        </div>

        <hr />
        <div>
          <br />
          <h3 className="flex justify-center text-orange-500 font-bold underline text-3xl"> -- आपकी यादें --</h3>
        <br />
        <hr />
          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.isArray(images) && images.length === 0 && (
              <p className="col-span-full text-center text-red-500">
                No images available 🥲
              </p>
            )}

            {Array.isArray(images) &&
              images.map((img, index) => (
                <div
                  key={index}
                  className="cursor-pointer p-2 bg-white rounded-xl shadow hover:scale-105 duration-300"
                  onClick={() =>
                    setSelectedImage({ url: img.url, id: img._id })
                  }
                >
                  <img
                    src={img.url}
                    alt="Shakhaa Pic"
                    className="w-full h-48 object-cover rounded-lg mt-3"
                  />
                  <p> {new Date(img.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}</p>
                </div>
              ))}
          </div>

          {/* Modal for Fullscreen Image */}
          {selectedImage && selectedImage.url && (
            <div
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative">
                <img
                  src={selectedImage.url}
                  alt="Full Preview"
                  className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-xl border-4 border-white"
                />
                <button
                disabled={loading}
                  className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteImage(selectedImage.id);
                  }}
                > {loading ? <ButtonSpinner /> : "🗑️ Delete"}
                  {/* {loading ? "Deleting...":"🗑️ Delete"} */}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <hr />
      <div className="flex justify-center">
        <BackButton />
      </div>
      <Footer />
    </div>
  );
}
