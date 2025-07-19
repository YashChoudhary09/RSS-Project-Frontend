import React, { forwardRef } from "react";

/**
 * Print-friendly Tasks report.
 * Forward a ref from parent (useReactToPrint contentRef) so it can be printed.
 *
 * @param {Array} tasks - Array of task objects:
 *   { _id, shakhaaName, title, description, date }
 */
const PrintAllTasks = forwardRef(({ tasks = [] }, ref) => {
  const stamp = new Date().toLocaleString();

  return (
    <div ref={ref} className="p-4 print:p-0 bg-white text-black">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-center mb-4">
        All Tasks Report
      </h1>
      <p className="text-center text-sm text-gray-500 mb-6">
        Printed: {stamp} &middot; Total Tasks: {tasks.length}
      </p>

      {/* Tasks Table */}
      <table className="w-full text-sm border border-gray-400 print:text-xs">
        <thead className="bg-orange-100">
          <tr>
            <th className="border border-gray-400 px-2 py-1">#</th>
            <th className="border border-gray-400 px-2 py-1">Shakhaa</th>
            <th className="border border-gray-400 px-2 py-1">Title</th>
            <th className="border border-gray-400 px-2 py-1">Description</th>
            <th className="border border-gray-400 px-2 py-1">Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t, i) => (
            <tr key={t._id || i} className="break-inside-avoid">
              <td className="border text-center border-gray-300 px-2 py-1 text-center">
                {i + 1}
              </td>
              <td className="border text-center  border-gray-300 px-2 py-1">
                {t.shakhaaName || "-"}
              </td>
              <td className="border text-center border-gray-300 px-2 py-1 font-medium">
                {t.title || "-"}
              </td>
              <td className="border text-center border-gray-300 px-2 py-1 max-w-[240px] break-words">
                {t.description || "-"}
              </td>
              <td className="border text-center border-gray-300 px-2 py-1 whitespace-nowrap">
                {t.date
                  ? new Date(t.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "-"}
              </td>
            </tr>
          ))}

          {tasks.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="border border-gray-300 px-2 py-4 text-center text-gray-500"
              >
                No tasks to print.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Footer */}
      <p className="mt-8 text-center text-xs text-gray-400 print:mt-4">
        RSS Shakhaa System
      </p>
    </div>
  );
});

export default PrintAllTasks;
