/** @format */

import React from "react";
import { Input, Select, Option } from "@material-tailwind/react";

const PatientData = (props) => {
  const { name, age, contact, doctorName } = props.data;
  return (
    <div className=" flex flex-col gap-4 mt-4 justify-center items-start bg-white p-8 rounded-md shadow-md">
      <h2 className="text-left text-md">রোগীর তথ্য</h2>
      <div className="flex gap-2 justify-start items-center">
        <Input
          label="নাম"
          required
          maxLength={50}
          value={name}
          name="name"
          onChange={(e) => {
            const value = e.target.value;
            // Allow only a-z and A-Z characters
            const regex = /^[a-zA-Z\s]*$/;
            if (regex.test(value) || value === "") {
              props.onChange(e); // Pass the valid input to the parent
            }
          }}
        />

        <Input label="বয়স" required type="number" max={200} value={age} name="age" onChange={props.onChange} />
        <Input
          label="যোগাযোগের নাম্বার"
          required
          type="tel"
          maxLength={11}
          minLength={11}
          value={contact}
          name="contact"
          onChange={(e) => {
            const value = e.target.value;
            // Allow only digits and maintain length of exactly 11
            if (/^\d*$/.test(value) && value.length <= 11) {
              props.onChange(e);
            }
          }}
        />
      </div>
      <div className="flex gap-2 justify-start items-center">
        <Select
          label="Gender"
          required
          name="gender"
          onChange={(val) => props.onChange({ target: { name: "gender", value: val } })}
        >
          <Option value="male">পুরুষ</Option>
          <Option value="female">মহিলা</Option>
        </Select>
        <Select onChange={props.onAddingReferrer} label="রেফারেন্সকারী" name="referrer">
          {props.referrerList.map((item, index) => (
            <Option key={index} value={JSON.stringify(item)}>
              {item.name}
            </Option>
          ))}
        </Select>

        <Input label="ডাক্তারের নাম" maxLength={70} value={doctorName} name="doctorName" onChange={props.onChange} />
      </div>
    </div>
  );
};

export default PatientData;
