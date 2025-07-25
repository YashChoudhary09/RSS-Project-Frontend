import Navbaar from "./Navbaar";
import Footer from "./Footer";
import { useState, useEffect, useRef } from "react";
import BackButton from "./Backbutton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import PrintAllTasks from "./PrintAllTask.jsx";

export default function AllTask() {
  let navigate = useNavigate();
  let [taskData, setTaskData] = useState([]);
  let [title, setTitle] = useState("");
  let [shakhaaName, setShakhaaName] = useState("");
  let componentRef = useRef();
  const userRole = localStorage.getItem("role");

  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "All-Tasks-Report",
    onAfterPrint: () => console.log("Tasks printed."),
    onPrintError: (err) => {
      console.error("Task print error:", err);
      toast.error("Print failed!");
    },
  });

  const handleDelete = async (id) => {
    const BASE_URL = import.meta.env.VITE_API_URL;

    const confirm = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(`${BASE_URL}/deleteTask/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await res.json();
      if (result.access === false) {
        toast.error(result.message);
      } else {
        toast.success(result.message || "Deleted successfully");
        setTaskData((prev) => prev.filter((task) => task._id !== id));
      }
    } catch (err) {
      console.error("Error deleting task:", err);
      toast.error("Failed to delete 😥");
    }
  };

  useEffect(() => {
    const fetchAllTasks = () => {
      const BASE_URL = import.meta.env.VITE_API_URL;

      fetch(`${BASE_URL}/allTask`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` || "",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTaskData(data.allTasks);
        })
        .catch((err) =>
          console.log("Error occur during fetching tasks !", err)
        );
    };

    // call on mount
    fetchAllTasks();

    // call again when window/tab regains focus
    const handleFocus = () => {
      fetchAllTasks();
    };

    window.addEventListener("focus", handleFocus);
    if (title.trim() === "" && shakhaaName.trim() === "") {
      handleSearch("", "");
    }

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [title, shakhaaName]);

  let handleEdit = (id) => {
    navigate(`/editTask/${id}`);
  };

  // handle search
  const handleSearch = (title, shakhaaName) => {
    const BASE_URL = import.meta.env.VITE_API_URL;

    if (!title.trim() && !shakhaaName.trim()) {
      fetch(`${BASE_URL}/allTask`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setTaskData(data.allTasks);
          } else {
            toast.error(data.message);
          }
        })
        .catch((err) => {
          console.log("Error re-fetching all tasks:", err);
        });
      return;
    }
    let query = [];
    if (title.trim()) query.push(`title=${encodeURIComponent(title.trim())}`);
    if (shakhaaName.trim())
      query.push(`shakhaaName=${encodeURIComponent(shakhaaName.trim())}`);
    let queryString = query.length ? `?${query.join("&")}` : "";

    fetch(`${BASE_URL}/findTask${queryString}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          toast.success(data.message);
          setTaskData(data.foundedTask);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log("Error during search task:", err);
      });
    // delay of 500ms
  };

  return (
    <div>
      <Navbaar />
      <div className="p-4">
        <h2 className="text-3xl text-center font-bold text-orange-500 mb-6">
          -- सभी कार्य --
        </h2>
        <div className="flex justify-center">
          {userRole === "admin" && (
            <div className="mb-4 text-center mr-2">
              <button
                onClick={handlePrint}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
              >
                Print All Tasks
              </button>
            </div>
          )}
          <input
            type="text"
            placeholder="🔍 कार्य का शीर्षक लिखें !"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-orange-300 px-4 py-2 mr-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
          />

          <input
            type="text"
            placeholder="🔍 शाखा का नाम लिखें !"
            value={shakhaaName}
            onChange={(e) => setShakhaaName(e.target.value)}
            className="border border-orange-300 px-4 py-2 mr-1rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
          />
          <button
            onClick={() => handleSearch(title, shakhaaName)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-orange-600 mb-4"
          >
            🔍 खोजें
          </button>
        </div>

        {taskData.length === 0 ? (
          <p className="text-center text-gray-500">No tasks available 🥲</p>
        ) : (
          <div className="overflow-x-auto" ref={componentRef}>
            <table className="min-w-full border border-orange-300 shadow rounded-lg">
              <thead className="bg-orange-100">
                <tr>
                  <th className="px-6 py-3 text-left text-orange-600 font-semibold">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-orange-600 font-semibold">
                    शाखा
                  </th>
                  <th className="px-6 py-3 text-left text-orange-600 font-semibold">
                    शीर्षक
                  </th>
                  <th className="px-6 py-3 text-left text-orange-600 font-semibold">
                    विवरण
                  </th>
                  <th className="px-6 py-3 text-left text-orange-600 font-semibold">
                    दिनांक
                  </th>
                  <th className="px-6 py-3 text-left text-orange-600 font-semibold"></th>
                  <th className="px-6 py-3 text-left text-orange-600 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {taskData.map((task, index) => (
                  <tr
                    key={task._id}
                    className="bg-white border-b hover:bg-orange-50"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{task.shakhaaName}</td>
                    <td className="px-6 py-4">{task.title}</td>
                    <td className="px-6 py-4">{task.description}</td>
                    <td className="px-6 py-4">
                      {new Date(task.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleEdit(task._id)}
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        ✏️ Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div style={{ position: "absolute", top: "-10000px" }}>
        <PrintAllTasks ref={printRef} tasks={taskData} />
      </div>

      <hr />
      <div className="flex justify-center">
        <BackButton />
      </div>
      <Footer />
    </div>
  );
}
