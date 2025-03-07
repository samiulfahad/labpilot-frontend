/** @format */

import React from "react";

const PatientData = (props) => {
  const { name, age, contact, doctorName } = props.data;
  return (
    <div className="flex flex-col gap-4 mt-4 justify-center items-start bg-white p-8 rounded-md shadow-md">
      {/* <h2 className="text-left text-md">Patient's Info</h2> */}
      <div className="flex gap-2 justify-between items-center">
        {/* Patient's Name */}
        <input
          type="text"
          maxLength={50}
          className="border-1 border-black h-10 rounded px-2 focus:outline-none"
          value={name}
          name="name"
          required
          onChange={(e) => {
            const value = e.target.value;
            const regex = /^[a-zA-Z\s]*$/;
            if (regex.test(value) || value === "") {
              props.onChange(e);
            }
          }}
          placeholder="Patient's Name"
        />

        {/* Patient's Age */}
        <input
          type="number"
          max={200}
          className="border-1 border-black h-10 rounded px-2 focus:outline-none"
          value={age}
          name="age"
          required
          onChange={props.onChange}
          placeholder="Patient's Age"
        />

        {/* Patient's Contact No */}
        <input
          type="tel"
          maxLength={11}
          minLength={11}
          className="border-1 border-black h-10 rounded px-2 focus:outline-none"
          value={contact}
          name="contact"
          required
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value) && value.length <= 11) {
              props.onChange(e);
            }
          }}
          placeholder="Patient's Contact No."
        />
      </div>

      <div className="flex gap-2 justify-between items-center w-full">
        {/* Patient's Gender  */}
        <select
          className="border-1 border-black h-10 rounded px-2 focus:outline-none"
          name="gender"
          required
          onChange={(e) => props.onChange(e)}
        >
          <option value="" disabled selected hidden>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        {/* Referrer */}
        <select
          className="border-1 border-black h-10 rounded px-2 focus:outline-none"
          name="referrer"
          required
          onChange={props.onAddingReferrer}
        >
          <option value="" disabled selected hidden>
            Select Referrer
          </option>
          {props.referrers.map((item, index) => (
            <option key={index} value={JSON.stringify(item)}>
              {item.name}
            </option>
          ))}
        </select>

        {/* Doctor's Name */}
        <input
          type="text"
          maxLength={70}
          className="border-1 border-black rounded px-2 h-10 focus:outline-none"
          value={doctorName}
          name="doctorName"
          onChange={props.onChange}
          placeholder="Doctor's Name"
        />
      </div>
    </div>
  );
};

export default PatientData;
