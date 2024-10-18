/** @format */

import React from "react";
import { Input, Select, Option } from "@material-tailwind/react";

const PatientData = (props) => {
  const { name, age, contact, doctorName, gender } = props.data;
  return (
    <div className=" flex flex-col gap-4 mt-4 justify-start items-start w-full ">
      <h2 className="text-left text-md">রোগীর তথ্য</h2>
      <div className="flex gap-2 justify-between">
        <Input label="নাম"  value={name} name="name" onChange={props.onChange} />
        <Select
          label="Gender"
          name="gender"
          onChange={(val) => {
            let e = { target: { name: "", value: "" } };
            e.target.name = "gender";
            e.target.value = val;
            props.onChange(e);
          }}
        >
          <Option value="male">পুরুষ</Option>
          <Option value="female">মহিলা</Option>
        </Select>
        <Input label="বয়স" value={age} name="age" onChange={props.onChange} />
      </div>
      <div className="flex gap-2 justify-between">
        <Input
          label="যোগাযোগের নাম্বার"
          
          type="number"
          value={contact}
          name="contact"
          onChange={props.onChange}
        />
        <Select onChange={props.onReferrer}
          label="কমিশনভোগী"
          name="referrer"
       
        >
          {props.referrerList.map((item, index) => (
            <Option key={index} value={JSON.stringify(item)} >{item.name}</Option>
          ))}
        </Select>

        <Input label="ডাক্তারের নাম" value={doctorName} name="doctorName" onChange={props.onChange} />
      </div>
    </div>
  );
};

export default PatientData;
