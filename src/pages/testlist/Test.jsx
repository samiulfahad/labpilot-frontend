/** @format */

import axios from "axios";
import React, { useState, useEffect } from "react";
import { API_URL } from "../../../config";

const Test = ({ test, statusUpdate, msgUpdate }) => {
  const [disabled, setDisabled] = useState(true);
  const testId = test._id;
  const [price, setPrice] = useState(test.price || 0);

  useEffect(() => {}, [test.price]);

  const handleSave = async () => {
    try {
      statusUpdate("processing");
      msgUpdate("টেস্টের মূল্য আপডেট করা হচ্ছে...");
      const response = await axios.put(API_URL + "/api/v1/user/test/update", {
        testId: testId,
        field: "price",
        value: price,
      });
      if (response.data.success) {
        statusUpdate("success");
        msgUpdate("টেস্টের মূল্য সফলভাবে আপডেট করা হয়েছে");
        setDisabled(!disabled);
      } else {
        statusUpdate("error");
        msgUpdate("টেস্টের মূল্য আপডেট করা যায়নি। পেইজটি Refresh/Reload করে আবার চেষ্টা করুন");
        console.log(response.data);
      }
    } catch (e) {
      statusUpdate("error");
      msgUpdate("টেস্টের মূল্য আপডেট করা যায়নি। পেইজটি Refresh/Reload করে আবার চেষ্টা করুন");
      console.log(e);
    }
  };

  const handleDisabled = () => {
    setDisabled(!disabled);
  };

  const handleChange = (e) => {
    setPrice(parseFloat(e.target.value));
  };

  return (
    <div>
      <div className="">
        <div className="flex justify-between items-center py-1 space-x-4">
          <p className="w-32 text-right">{test.name}</p>
          <input
            value={price}
            type="number"
            disabled={disabled}
            onChange={handleChange} // Handle input changes
            className={`px-4 text-center w-40 rounded ${!disabled ? "border border-gray-300" : "bg-gray-200 text-gray-500"}`}
          />
          <div>
            {disabled ? (
              <button onClick={handleDisabled} className="btn-sm">
                Edit Price
              </button>
            ) : (
              <div className="flex space-x-4">
                <button onClick={handleSave} className="px-4 py-1 bg-green-500 rounded-lg text-white">
                  Save
                </button>
                <button onClick={handleDisabled} className="px-4 py-1 bg-red-500 rounded-lg text-white">
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>


    </div>
  );
};

export default Test;
