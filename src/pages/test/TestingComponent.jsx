/** @format */

import React from "react";
import TimeFrame from "../../components/time-frame";

const TestingComponent = () => {
  const fetchData = (startDate, endDate) => {
    console.log("onFetchData");
    console.log(startDate);
    console.log(endDate);
  };
  return (
    <div>
      <TimeFrame
        onFetchData={fetchData}
        titleToday="ajker"
        titleDate="Specific date"
        titleMonth="Specific Month"
        titleRange="Specific Range"
      />
    </div>
  );
};

export default TestingComponent;
