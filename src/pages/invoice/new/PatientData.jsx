import React from "react"
import { Input, Select, Option } from "@material-tailwind/react"


const PatientData = (props) => {
  const { name, age, contact, referredBy, gender } = props.data
  return (
    <div className=" flex flex-col gap-4 mt-4 justify-start items-start w-full ">
      <h2 className="text-left text-md">Patient's Info</h2>
      <div className="flex gap-2 justify-between">
        <Input label="Name" required value={name} name="name" onChange={props.onChange} />
        <Select
          label="Gender"
          name="gender"
          onChange={(val) => {
            let e = { target: { name: "", value: "" } }
            e.target.name = "gender"
            e.target.value = val
            props.onChange(e)
          }}
        >
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
        <Input label="Age" required value={age} name="age" onChange={props.onChange} />
      </div>
      <div className="flex gap-2 justify-between">
        <Input label="Contact" required type="number" value={contact} name="contact" onChange={props.onChange} />
        <Input label="Referred By" required value={referredBy} name="referredBy" onChange={props.onChange} />
      </div>
    </div>
  )
}

export default PatientData
