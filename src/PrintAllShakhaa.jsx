import React, { forwardRef } from "react";

const PrintAllShakhaa = forwardRef(({ data = [] }, ref) => {
  const today = new Date().toLocaleString(); // Print timestamp

  return (
    <div ref={ref} className="p-4 print:p-0 bg-white text-black">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center mb-4">
       सभी शाखा सूची 
      </h1>
      <p className="text-center text-sm text-gray-500 mb-6">
        Printed: {today}
      </p>

      {data.map((s, i) => (
        <div
          key={s._id || i}
          className="mb-6 p-4 "
        >
          {/* Top Info Row */}
          <div className="grid grid-cols-5 gap-2 text-sm font-medium text-center bg-orange-100 border border-gray-400 rounded-md">
            <p className="border-r border-gray-400 py-1">
              <strong>शाखा:</strong> {s.shakhaaName}
            </p>
            <p className="border-r border-gray-400 py-1"> 
              <strong>विभाग:</strong> {s.vibhaag}
            </p>
            <p className="border-r border-gray-400 py-1">
              <strong>जिला:</strong> {s.jila}
            </p>
            <p className="border-r border-gray-400 py-1">
              <strong>नगर:</strong> {s.nagar}
            </p>
            <p className="py-1">
              <strong>बस्ती:</strong> {s.basti}
            </p>
          </div>

          {/* Admin/Contact/Role/Address Table */}
          <div className="mt-4 border border-gray-400">
            <div className="grid grid-cols-4 bg-orange-100 font-semibold text-center">
              <div className="border-r border-gray-400 py-1">कार्यकर्ता </div>
              <div className="border-r border-gray-400 py-1">सम्पर्क </div>
              <div className="border-r border-gray-400 py-1">दायित्व </div>
              <div className="py-1">पता </div>
            </div>
            <div className="grid grid-cols-4 text-center text-sm">
              <div className="border-r border-gray-300">
                {s.adminName.map((a, idx) => (
                  <p key={idx} className="py-1 border-b border-gray-200">
                    {a}
                  </p>
                ))}
              </div>
              <div className="border-r border-gray-300">
                {s.contactNumber.map((c, idx) => (
                  <p key={idx} className="py-1 border-b border-gray-200">
                    {c}
                  </p>
                ))}
              </div>
              <div className="border-r border-gray-300">
                {s.role.map((r, idx) => (
                  <p key={idx} className="py-1 border-b border-gray-200">
                    {r}
                  </p>
                ))}
              </div>
              <div>
                {s.address.map((ad, idx) => (
                  <p
                    key={idx}
                    className="py-1 border-b border-gray-200 break-words"
                  >
                    {ad}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Footer */}
      <p className="mt-8 text-center text-xs text-gray-400 print:mt-4">
        RSS Shakhaa System
      </p>
    </div>
  );
});

export default PrintAllShakhaa;
