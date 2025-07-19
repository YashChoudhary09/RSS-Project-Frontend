import React, { forwardRef } from "react";

const PrintAllShakhaa = forwardRef(({ data = [] }, ref) => {
  const today = new Date().toLocaleString(); // Print timestamp

  return (
    <div ref={ref} className="p-4 print:p-0 bg-white text-black">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center mb-4">
        All Shakhaa Report
      </h1>
      <p className="text-center text-sm text-gray-500 mb-6">
        Printed: {today}
      </p>

      {/* Table */}
      <table className="w-full text-sm border border-gray-400 print:text-xs">
        <thead className="bg-orange-100">
          <tr>
            <th className="border border-gray-400 px-2 py-1">Shakhaa Name</th>
            <th className="border border-gray-400 px-2 py-1">Jila</th>
            <th className="border border-gray-400 px-2 py-1">Nagar</th>
            <th className="border border-gray-400 px-2 py-1">Basti</th>
            <th className="border border-gray-400 px-2 py-1">Admin</th>
            <th className="border border-gray-400 px-2 py-1">Contact</th>
            <th className="border border-gray-400 px-2 py-1">Role</th>
            <th className="border border-gray-400 px-2 py-1">Address</th>
          </tr>
        </thead>
        <tbody>
          {data.map((s, i) => (
            <tr key={s._id || i} className="break-inside-avoid">
              <td className="border text-center border-gray-300 px-2 py-1 font-semibold">
                {s.shakhaaName}
              </td>
              <td className="border  text-center border-gray-300 px-2 py-1">{s.jila}</td>
              <td className="border  text-center border-gray-300 px-2 py-1">{s.nagar}</td>
              <td className="border  text-center border-gray-300 px-2 py-1">{s.basti}</td>
              <td className="border  text-center border-gray-300 px-2 py-1">{s.adminName}</td>
              <td className="border  text-center border-gray-300 px-2 py-1">{s.contactNumber}</td>
              <td className="border  text-center border-gray-300 px-2 py-1">{s.role}</td>
              <td className="border  text-center border-gray-300 px-2 py-1 max-w-[180px] break-words">
                {s.address}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <p className="mt-8 text-center text-xs text-gray-400 print:mt-4">
        RSS Shakhaa System
      </p>
    </div>
  );
});

export default PrintAllShakhaa;
