/** @format */

import { useState } from "react";
import Modal from "../modal";

const TimeFrame = ({ onFetchData, titleToday, titleDate, titleMonth, titleRange }) => {
  const [startDate, setStartDate] = useState("today");
  const [endDate, setEndDate] = useState("today");
  const [date, setDate] = useState("");
  const [modal, setModal] = useState("");

  // Utility: Converts date to "YYMMDD"
  const dateConverter = (date) => {
    const parts = date.split("-");
    return parts[0][2] + parts[0][3] + parts[1] + parts[2];
  };

  // Utility: Formats the date for display
  const formatDate = (start, end, mode) => {
    const parseDate = (dateStr) => {
      const year = `20${dateStr.slice(0, 2)}`;
      const month = dateStr.slice(2, 4) - 1; // Month is zero-based
      const day = dateStr.slice(4, 6);
      return new Date(year, month, day);
    };

    if (mode === "today") return "Today";

    if (mode === "month") {
      const startMonth = parseDate(start);
      return startMonth.toLocaleDateString("en-US", { year: "numeric", month: "long" });
    }

    if (mode === "date") {
      const selectedDate = parseDate(start);
      return selectedDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    }

    if (mode === "range") {
      const startFormatted = parseDate(start).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const endFormatted = parseDate(end).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return `From ${startFormatted} to ${endFormatted}`;
    }

    return "";
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
    const formattedDate = formatDate(startDate, endDate, modal);
    onFetchData(startDate, endDate, formattedDate); // Pass startDate, endDate, and formattedDate
    setModal(null);
  };

  const closeModal = () => {
    setStartDate("");
    setEndDate("");
    setDate("");
    setModal("");
  };

  return (
    <section>
      <div className="flex flex-wrap gap-2 justify-center items-center mx-auto px-10 mt-4">
        <div>
          <button onClick={() => onFetchData("today", "today", "Today")} className="btn-sm">
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

        <div className="text-left flex flex-col justify-center items-center">
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




















// /** @format */

// import { useState } from "react";

// // feature => Output the date also. Like if the date is "Today", "January, 2024 ", "Feb 27, 2023", "From Nov 5, 2024 to Dec 10, 2024"
// // onFetchData fuction will also output the date
// import Modal from "../modal";

// const TimeFrame = ({ onFetchData, titleToday, titleDate, titleMonth, titleRange }) => {
//   const [startDate, setStartDate] = useState("today");
//   const [endDate, setEndDate] = useState("today");
//   const [date, setDate] = useState("");
//   const [modal, setModal] = useState("");

//   const dateConverter = (date) => {
//     const parts = date.split("-");
//     const structured = parts[0][2] + parts[0][3] + parts[1] + parts[2];
//     return structured;
//   };

//   const handleDateChange = (date) => {
//     if (modal === "date") {
//       const start = dateConverter(date) + "000000";
//       const end = dateConverter(date) + "235959";
//       setStartDate(start);
//       setEndDate(end);
//     }
//     if (modal === "month") {
//       const start = (dateConverter(date) + "01000000").replace("undefined", "");
//       const end = (dateConverter(date) + "31000000").replace("undefined", "");
//       setStartDate(start);
//       setEndDate(end);
//     }
//     setDate(date);
//   };

//   const handleDateRange = (date, dateType) => {
//     if (dateType === "startDate") {
//       const start = dateConverter(date) + "000000";
//       setStartDate(start);
//     }
//     if (dateType === "endDate") {
//       const end = dateConverter(date) + "235959";
//       setEndDate(end);
//     }
//   };

//   const handleSubmit = () => {
//     onFetchData(startDate, endDate)
//     setModal(null)
//     // setDate("")
//     // setStartDate(null)
//     // setEndDate(null)
//   }

//   const closeModal = () => {
//     setStartDate("");
//     setEndDate("");
//     setDate("");
//     setModal("");
//   };
//   return (
//     <section>
//       <div className="flex flex-wrap gap-2 justify-center items-center mx-auto px-10 mt-4">
//         <div>
//           <button onClick={() => onFetchData("today", "today")} className="btn-sm">
//             আজকের হিসাব
//           </button>
//         </div>
//         <div className="text-left flex flex-col justify-center items-center space-y-2">
//           <button onClick={() => setModal("date")} className="btn-sm">
//             নির্দিষ্ট তারিখের হিসাব
//           </button>
//         </div>

//         <div className="text-left flex flex-col justify-center items-center space-y-2">
//           <button onClick={() => setModal("month")} className="btn-sm">
//           নির্দিষ্ট মাসের হিসাব
//           </button>
//         </div>

//         <div className="text-left flex flex-col justify-center items-center">
//           <button onClick={() => setModal("dateRange")} className="btn-sm">
//           নির্দিষ্ট দিনসমূহের হিসাব
//           </button>
//         </div>
//       </div>

//       {(modal === "date" || modal === "month") && (
//         <Modal
//           type="dateOrMonth"
//           pick={modal}
//           startDate={date}
//           onDateChange={(date) => handleDateChange(date)}
//           onSubmit={handleSubmit}
//           onClosingModal={closeModal}
//         />
//       )}
//       {modal === "dateRange" && (
//         <Modal
//           type="dateRange"
//           onDateChange={handleDateRange}
//           onSubmit={handleSubmit}
//           onClosingModal={closeModal}
//         />
//       )}
//     </section>
//   );
// };

// export default TimeFrame;
