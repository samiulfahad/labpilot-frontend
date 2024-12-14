import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";  // Assuming axios is imported
import { API_URL } from "../../../config";
import TimeFrame from "../../components/time-frame";

const InvoicesByReferrer = () => {
  const [list, setList] = useState([]);
  const [state, setState] = useState("");
  const [msg, setMsg] = useState("");
  const [startDate, setStartDate] = useState("today");
  const [endDate, setEndDate] = useState("today");
  const location = useLocation();

  const referrerId = location?.state?.referrerId || null;
  const referrerName = location.state?.referrerName || "NOT AVAILABLE";

  // This useEffect will handle setting the startDate and endDate only once when location.state is available.
  useEffect(() => {
    if (location?.state?.startDate && location?.state?.endDate) {
      setStartDate(location.state.startDate);
      setEndDate(location.state.endDate);
    }
  }, [location.state]);

  const fetchData = async (startDate, endDate) => {
    try {
      setState("processing");
      setMsg("ডাটা লোড হচ্ছে...");
      const response = await axios.get(API_URL + "/api/v1/invoice/render-list/", {
        params: { startDate, endDate, referrerId },
      });
      if (response.data.success) {
          setList(response.data.list);
          console.log(response.data.list);
        setState("");
        setMsg("");
      } else {
        setMsg("ডাটা লোড করা যায়নি। অনুগ্রহ করে পেইজটি Refresh/Reload করুন।");
        setState("error");
      }
    } catch (e) {
      setMsg("ডাটা লোড করা যায়নি। অনুগ্রহ করে পেইজটি Refresh/Reload করুন।");
      setState("error");
      console.log(e.response);
    }
  };

  useEffect(() => {
    if (referrerId) {
      fetchData(startDate, endDate);
    }
  }, [startDate, endDate, referrerId]);  // Dependency array ensures data is fetched when any of these values change

  const closeModal = () => {
    setState("");
    setMsg("");
    };
    const handleFetchData = (start, end) => {
        console.log(start);
        console.log(end);
        fetchData(start, end)
    }

  return (
      <div className="overflow-x-auto w-4/5 mt-8 mx-auto">
          <TimeFrame onFetchData={handleFetchData} />
      <div className="text-xl text-center mb-4 w-full">Referrer Name: {referrerName}</div>
      <table className="min-w-full bg-white text-blue-gray-800 border border-gray-200 rounded-md">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">SL No.</th>
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">ID</th>
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">Total</th>
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">Referrer Discount</th>
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">Commission</th>
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">Due</th>
            <th className="px-4 py-2 text-left font-semibold text-sm text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={index} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b hover:bg-gray-100`}>
              <td className="px-4 py-2 text-sm">{index + 1}</td>
              <td className="px-4 py-2 text-sm">{item.invoiceId}</td>
              <td className="px-4 py-2 text-sm">{item.total}</td>
              <td className="px-4 py-2 text-sm">{item.discount}</td>
              <td className="px-4 py-2 text-sm">{item.commission}</td>
              <td className="px-4 py-2 text-sm">{item.netAmount - item.paid}</td>
              <td className="px-4 py-2 text-sm">
                <Link
                  to={"/invoice/action/"}
                  state={{ _id: item._id }}
                  className="px-3 py-1 text-white bg-blue-gray-800 hover:bg-blue-gray-600 rounded text-sm"
                >
                  Action
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesByReferrer;
