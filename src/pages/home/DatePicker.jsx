import { useState } from 'react';

function DatePicker({ onFilter }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = () => {
    // Pass the dates to the parent component or directly make an API call
    onFilter({ startDate, endDate });
  };

  return (
    <div className='w-full p-20 mx-auto m-10 bg-white'>
      <div className='flex justify-between w-1/2'>
        <p>Start Date</p>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className='flex justify-between w-1/2'>
      <p>End Date</p>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button className='btn' onClick={handleSubmit}>Filter</button>
    </div>
  );
}

export default DatePicker;
