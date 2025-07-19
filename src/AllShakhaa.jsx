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

 

const handlePrint = useReactToPrint({
  contentRef: componentRef,              // 👈 v3 way
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
    fetch("https://rss-project-backend.onrender.com/allShakhaaInfo", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.allShakhaa);
        } else {
          toast.error(data.message);
        }
        console.log("allShakhaaInfo:", data);
      })
      .catch((err) => {
        console.error("Error fetching shakhaa info:", err);
      });

    fetch("https://rss-project-backend.onrender.com/allshakhaaImages", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setImages(data.images);
        } else {
          toast.error(data.message);
        }
        console.log("allShakhaaImages:", data);
      })
      .catch((err) => {
        console.error("Error fetching images:", err);
        toast.error("Something went wrong while fetching images!");
      });
  }, []);

  // Delete shakhaa
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this shakhaa?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://rss-project-backend.onrender.com/deleteShakhaa/${id}`, {
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
    }
  };

  // Delete image
  const handleDeleteImage = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this picture?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `https://rss-project-backend.onrender.com/deleteShakhaa/images/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

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
    }
  };

  const handleEdit = (id) => {
    navigate(`/editShakhaa/${id}`);
  };

  return (
    <div>
      <Navbaar />
      <div className="p-4">
        <h2 className="text-3xl text-center font-bold mb-6 text-orange-500">
          All Shakhaa Info
        </h2>


        {userRole === "admin" && (
                 <button
             onClick={handlePrint}
               disabled={!componentRef.current}
               className={`px-4 py-2 rounded-md transition mb-2 ${
               componentRef.current
               ? "bg-green-500 hover:bg-green-600 text-white"
               : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}> Print All Shakhaa
       </button>
        )}
      


        {/* Cards */}
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-4 mb-6 border border-orange-200 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold text-orange-600">
                Shakhaa -{" "}
                <span className="underline text-blue-700">
                  {item.shakhaaName}
                </span>
              </h3>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-600 font-semibold hover:underline"
                >
                  🗑️ Delete
                </button>
                <button
                  onClick={() => handleEdit(item._id)}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  ✏️ Edit
                </button>
              </div>
            </div>

            {/* Grid table */}
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="grid grid-cols-3 text-center font-medium bg-orange-100 border-b border-gray-300">
                <p className="py-2 border-r border-gray-300">Jila</p>
                <p className="py-2 border-r border-gray-300">Nagar</p>
                <p className="py-2">Basti</p>
              </div>
              <div className="grid grid-cols-3 text-center text-gray-700 border-b border-gray-300">
                <p className="py-2 border-r border-gray-300">{item.jila}</p>
                <p className="py-2 border-r border-gray-300">{item.nagar}</p>
                <p className="py-2">{item.basti}</p>
              </div>

              <div className="grid grid-cols-3 text-center font-medium bg-orange-100 border-b border-gray-300">
                <p className="py-2 border-r border-gray-300">Admin Name</p>
                <p className="py-2 border-r border-gray-300">Contact Number</p>
                <p className="py-2">Role</p>
              </div>
              <div className="grid grid-cols-3 text-center text-gray-700 border-b border-gray-300">
                <p className="py-2 border-r border-gray-300">{item.adminName}</p>
                <p className="py-2 border-r border-gray-300">
                  {item.contactNumber}
                </p>
                <p className="py-2">{item.role}</p>
              </div>

              <div className="text-center">
                <p className="py-2 font-medium bg-orange-100 border-b border-gray-300">
                  Address
                </p>
                <p className="py-2 text-gray-700">{item.address}</p>
              </div>
            </div>
          </div>
        ))}

       {/* Hidden print content */}
        <div style={{ position: "absolute", top: "-10000px" }}>
             <PrintAllShakhaa ref={componentRef} data={data} />
        </div>

        <hr />
        <div>
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
                    className="w-full h-48 object-cover rounded-lg"
                  />
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
                  className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteImage(selectedImage.id);
                  }}
                >
                  🗑️ Delete
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
