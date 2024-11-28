/** @format */

import React from "react";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <section>
      <div className="w-[450px] p-8 mt-8 bg-white rounded-md ml-40">
        <div className="flex justify-between items-center">
          <p className="text-left text-lg font-semibold">Referrer List</p>
          <Link state={{ type: "add", title: "Add New Referrer" }} to="/referrer/add-edit" className="px-4 py-1 bgColor text-white text-semibold rounded-md">
            Add New
          </Link>
        </div>
      </div>
    </section>
  );
};

export default index;
