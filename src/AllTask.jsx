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
  let componentRef = useRef();

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
    const confirm = window.confirm("Are you sure you want to delete this task?");
    if (!confirm) return;

    try {
      const res = await fetch(`https://rss-project-backend.onrender.com/deleteTask/${id}`, {
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
    fetch("https://rss-project-backend.onrender.com/allTask", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  }, []);

  let handleEdit = (id) => {
    navigate(`/editTask/${id}`);
  };

  return (
    <div>
      <Navbaar />
      <div className="p-4">
        <h2 className="text-3xl text-center font-bold text-orange-500 mb-6">
          All Tasks
        </h2>

        <div className="mb-4 text-center">
          <button
            onClick={handlePrint}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
          >
            Print All Tasks
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
                    Shakhaa Name
                  </th>
                  <th className="px-6 py-3 text-left text-orange-600 font-semibold">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-orange-600 font-semibold">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-orange-600 font-semibold">
                    Date
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
