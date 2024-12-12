/** @format */

import { useState } from "react";

// Optional feature => Add title to the Card Element. Like if the date is "Today's Cash Memo", "Cash Memo - January, 2024 ", "Cash Memo - Feb 27, 2023", "Cash Memo - From Nov 5, 2024 to Dec 10, 2024"
import Modal from "../modal";

const TimeFrame = ({ onFetchData, titleToday, titleDate, titleMonth, titleRange }) => {
  const [startDate, setStartDate] = useState("today");
  const [endDate, setEndDate] = useState("today");
  const [date, setDate] = useState("");
  const [modal, setModal] = useState("");

  const dateConverter = (date) => {
    const parts = date.split("-");
    const structured = parts[0][2] + parts[0][3] + parts[1] + parts[2];
    return structured;
  };

  const handleDateChange = (date) => {
    if (modal === "date") {
      const start = dateConverter(date) + "000000";
      const end = dateConverter(date) + "235959";
      setStartDate(start);
      setEndDate(end);
    }
    if (modal === "month") {
      const start = (dateConverter(date) + "01000000").replace("undefined", "");
      const end = (dateConverter(date) + "31000000").replace("undefined", "");
      setStartDate(start);
      setEndDate(end);
    }
    setDate(date);
  };

  const handleDateRange = (date, dateType) => {
    if (dateType === "startDate") {
      const start = dateConverter(date) + "000000";
      setStartDate(start);
    }
    if (dateType === "endDate") {
      const end = dateConverter(date) + "235959";
      setEndDate(end);
    }
  };

  const handleSubmit = () => {
    onFetchData(startDate, endDate)
    setModal(null)
    setDate("")
    setStartDate(null)
    setEndDate(null)
  }

  const closeModal = () => {
    setStartDate("");
    setEndDate("");
    setDate("");
    setModal("");
  };
  return (
    <section>
      <div className="flex flex-wrap gap-2 justify-center items-center mx-auto px-10 my-4">
        <div>
          <button onClick={() => onFetchData("today", "today")} className="btn-sm">
            আজকের হিসাব
          </button>
        </div>
        <div className="text-left flex flex-col justify-center items-center space-y-2">
          <button onClick={() => setModal("date")} className="btn-sm">
            নির্দিষ্ট তারিখের হিসাব
          </button>
        </div>

        <div className="text-left flex flex-col justify-center items-center space-y-2">
          <button onClick={() => setModal("month")} className="btn-sm">
          নির্দিষ্ট মাসের হিসাব
          </button>
        </div>

        <div className="text-left flex flex-col justify-center items-center space-y-2">
          <button onClick={() => setModal("dateRange")} className="btn-sm">
          নির্দিষ্ট দিনসমূহের হিসাব
          </button>
        </div>
      </div>

      {(modal === "date" || modal === "month") && (
        <Modal
          type="dateOrMonth"
          pick={modal}
          startDate={date}
          onDateChange={(date) => handleDateChange(date)}
          onSubmit={handleSubmit}
          onClosingModal={closeModal}
        />
      )}
      {modal === "dateRange" && (
        <Modal
          type="dateRange"
          onDateChange={handleDateRange}
          onSubmit={handleSubmit}
          onClosingModal={closeModal}
        />
      )}
    </section>
  );
};

export default TimeFrame;
