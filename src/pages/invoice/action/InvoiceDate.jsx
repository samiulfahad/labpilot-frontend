/** @format */

import React from "react";

const ConvertDate = ({ dateString }) => {
  const convertDate = (dateString) => {
    // Check if the dateString is empty or invalid
    if (!dateString || dateString.length !== 12 || isNaN(dateString)) {
      return "Invalid date format";
    }

    // Extract year, month, and day from the string
    const year = `20${dateString.substring(0, 2)}`; // The first two digits represent the year
    const month = dateString.substring(2, 4); // The next two digits represent the month
    const day = dateString.substring(4, 6); // The following two digits represent the day

    // Create a date object from the year, month, and day
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Validate month and day ranges
    if (parseInt(month) < 1 || parseInt(month) > 12 || parseInt(day) < 1 || parseInt(day) > 31) {
      return "Invalid month or day";
    }

    // Get month name from the array
    const monthName = months[parseInt(month) - 1];

    // Get the suffix for the day
    const suffix = (day) => {
      const dayInt = parseInt(day);
      if (dayInt >= 10 && dayInt <= 31) return `${day}th`; // Handle days 10th-31th as 'th'
      const lastDigit = dayInt % 10;
      if (lastDigit === 1) return `${day}st`;
      if (lastDigit === 2) return `${day}nd`;
      if (lastDigit === 3) return `${day}rd`;
      return `${day}th`;
    };

    // Return formatted date string
    return `${suffix(day)} ${monthName} ${year}`;
  };

  return <>{convertDate(dateString)}</>;
};

export default ConvertDate;
