/** @format */

import { useState } from "react";

const PatientData = ({ invoice, onChange, onSave }) => {
  const [disabled, setDisabled] = useState(true);

  const handleEdit = () => {
    setDisabled(!disabled);
  };
  return (
    <div>
      <div className="flex justify-between items-center text-center w-full">
        <p className="font-bold text-lg text-left w-28 py-4">Patient Info</p>
        {disabled && (
          <button onClick={handleEdit} className="mr-20 px-4 bgColor text-center flex-shrink-0 w-16 h-8 text-white">
            Edit
          </button>
        )}
      </div>
      <div className="flex flex-col justify-start items-center space-y-2 ">
        <div className="flex space-x-4 justify-start items-center">
          <p className="w-28 text-left">Name</p>
          <input
            name="name"
            value={invoice?.name}
            onChange={onChange}
            disabled={disabled}
            className="px-4 py-1 w-60 text-left"
          />
        </div>
        <div className="flex space-x-4 justify-start items-center">
          <p className="w-28 text-left">Age</p>
          <input
            name="age"
            value={invoice?.age}
            onChange={onChange}
            disabled={disabled}
            className="px-4 py-1 w-60 text-left"
          />
        </div>
        <div className="flex space-x-4 justify-start items-center">
          <p className="w-28 text-left">Contact</p>
          <input
            name="contact"
            value={invoice?.contact}
            onChange={onChange}
            disabled={disabled}
            className="px-4 py-1 w-60 text-left"
          />
        </div>
        <div className="flex space-x-4 justify-start items-center">
          <p className="w-28 text-left">Doctor's Name</p>
          <input
            name="doctorName"
            value={invoice?.doctorName}
            onChange={onChange}
            disabled={disabled}
            className="px-4 py-1 w-60 text-left"
          />
        </div>
        <div className="flex space-x-2 justify-start items-center">
          <p className="w-72 text-left">Gender</p>
          <select name="gender" disabled={disabled} onChange={onChange} className="">
            <option value="male" selected={invoice?.gender === "male"}>
              Male
            </option>
            <option value="female" selected={invoice?.gender === "female"}>
              Female
            </option>
          </select>
        </div>
        {!disabled && (
          <div className="flex justify-end items-center space-x-4 w-4/5">
            <button onClick={onSave} className="px-2 py-1 bgColor text-white rounded">
              Save
            </button>
            <button onClick={handleEdit} className="px-2 py-1 bg-red-400 text-white rounded">
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientData;
