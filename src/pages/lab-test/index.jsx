/** @format */

import React, { useState } from "react";

import Test from "./Test";

const index = () => {
  const [testList, setTestList] = useState([
    { testName: "CBC", price: 200 },
    { testName: "RBS", price: 300 },
    { testName: "ECG", price: 100 },
  ]);

  const handlePriceChange = (testName, newPrice) => {
    const updatedTestList = testList.map((item) => {
      if (item.testName === testName) {
        item.price = newPrice;
      }
      return item;
    });
    setTestList(updatedTestList); // Correct usage of setTestList
  };

  return (
    <section>
      <div className="flex flex-col ml-40">
        <div className="text-md mt-6">Price List of Tests</div>
        <div className="flex flex-col">
          {testList.map((item) => (
            <Test key={item.testName} testName={item.testName} price={item.price} onPriceChange={handlePriceChange} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default index;
