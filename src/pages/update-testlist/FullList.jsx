/** @format */

import React from "react";
import { Checkbox } from "@material-tailwind/react";

const FullList = (props) => {
  return (
    <div className="w-full">
      <p className="text-center my-2 text-black font-semibold">
        যে Test এর রিপোর্টগুলি আমাদের ওয়েবসাইটে আপলোড করা যাবে সেগুলো Online Test আর বাকিগুলি Offline Test
      </p>
      <div>
        <p className="font-bold">Online Tests:</p>
        {props.list?.map((test) => {
          if (test.type === 1) {
            return (
              <Checkbox
                key={test.code}
                label={test.name}
                value={test.name}
                checked={props.myList.includes(test)}
                onChange={() => props.onChange(test)}
              />
            );
          }
        })}
      </div>
      <div>
        <p className="font-bold">Offline Test</p>
        {props.list?.map((test) => {
          if (test.type === 2) {
            return (
              <Checkbox
                key={test.code}
                label={test.name}
                value={test.name}
                checked={props.myList.includes(test)}
                onChange={() => props.onChange(test)}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FullList;
