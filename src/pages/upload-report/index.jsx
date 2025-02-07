/** @format */

import React, { useEffect, useState } from "react";
import Test from "./Test";
import { API_URL, LAB_V1 } from "../../../config";
import axios from "axios";
import { Link } from "react-router-dom";

const index = () => {
  const [status, setStatus] = useState("processing");
  const [msg, setMsg] = useState("");
  const [list, setList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const fetchData = async () => {
    setMsg("Loading Data....");
    try {
      const response = await axios.get(API_URL + LAB_V1 + "/test/all", { params: { uploadReport: 1 } });
      if (response.data.success) {
        const onlineTests = response.data.list.filter((test) => test.type === 1);
        // console.log(onlineTests);
        setList(onlineTests);
        setStatus("");
        setMsg("");
      } else {
        setStatus("error");
        setMsg("Data Fetching failed");
      }
    } catch (e) {
      setStatus("error");
      setList([]);
      setMsg("Data Fetching failed");
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase() || "NO SEARCH KEYWORD";
    console.log(value);
    const result = list.filter((item) => item.name.toLowerCase().startsWith(value));
    console.log(result);
    setSearchResult(result);
  };
  return (
    <div className="flex-flex-col justify-center items-center  w-full">
      <div className="flex justify-center items-center my-4">
        <input
          placeholder="Search test..."
          onChange={handleSearch}
          className="px-4 py-2 w-60 rounded focus:outline-none"
        />
      </div>

      {searchResult.length > 0 && (
        <div>
          <div className="w-60 bg-white mx-auto flex flex-col justify-center items-center mb-4">
            {searchResult.map((item) => (
              <Link key={item._id} to={"/upload-report/" + item.code} className="font-bold">
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 justify-center items-center">
        {list.map((item) => (
          <Test key={item._id} name={item.name} code={item.code} id={item._id} />
        ))}
      </div>
    </div>
  );
};

export default index;
