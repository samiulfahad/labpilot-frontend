/** @format */

import React from "react";

const MyList = (props) => {
  return (
    <div className="">
      <p className="text-lg font-bold text-center">My Tests</p>
      {props.list.length === 0 && (
        <p className="text-center">আপনি এখনো কোনো টেস্ট সিলেক্ট করেন নি। উপরের লিস্ট থেকে টেস্ট সিলেক্ট করুন</p>
      )}
      {props.list.length !== 0 && (
        <div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-start items-start">
              {/* Online Test */}
              <div className="flex space-x-4 w-full">
                <p className="font-bold text-left">Online Test: </p>
                {props.list.filter((test) => test.type === 1).length > 0 ? (
                  <p>
                    {props.list
                      .filter((test) => test.type === 1)
                      .map((test) => test.name)
                      .join(", ")}
                    .
                  </p>
                ) : (
                  <p>NO ONLINE Test selected</p>
                )}
              </div>

              {/* Offline Test */}
              <div className="flex space-x-4">
                <p className="font-bold text-left">Offline Test: </p>
                {props.list.filter((test) => test.type === 2).length > 0 ? (
                  <p>
                    {props.list
                      .filter((test) => test.type === 2)
                      .map((test) => test.name)
                      .join(", ")}
                    .
                  </p>
                ) : (
                  <p>NO OFFLINE Test selected</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center py-4">
            <button onClick={props.onUpdate} className="btn">Update</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyList;
