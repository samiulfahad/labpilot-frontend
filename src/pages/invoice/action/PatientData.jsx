/** @format */

import React, { useState } from "react";

const PatientData = ({ label, val, name, type, onChange, onUpdate }) => {
  const [disabled, setDisabled] = useState(true);
  const [action, setAction] = useState("Change");

  const handleToggle = () => {
    setDisabled(prev => !prev);
    setAction(prev => (prev === "Update" ? "Change" : "Update"));
    if (action === "Update") {
      onUpdate()
    }
  };

  const handleCancel = () => {
    setDisabled(true);
    setAction("Change");
    onChange("cancel");
  };

  return (
    <div className="flex justify-between items-center mx-auto w-full py-1 space-x-3">
      <p className="text-md w-full mx-auto text-justify">{label}</p>
      <input
        name={name}
        value={val}
        onChange={onChange}
        type={type}
        disabled={disabled}
        className={`px-2 py-1 ${disabled ? "bg-gray-300" : "border-2 border-blue-gray-500 text-black"} rounded-lg`}
      />
      <button className="btn-sm" onClick={handleToggle}>
        {action}
      </button>
      {!disabled && (
        <button onClick={handleCancel} className="btn-sm !bg-red-500 !border-red-500 hover:text-white">
          Cancel
        </button>
      )}
    </div>
  );
};

export default PatientData;
