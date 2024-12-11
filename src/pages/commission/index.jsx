/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../../config";

const Commission = () => {
    const [referrers, setReferrers] = useState([])
    const [invoices, setInvoices] = useState([])
    
    const fetchData = async (startDate, endDate) => {
        try {
            const response = await axios.get(API_URL + "/api/v1/user/commission", {
                params: {startDate, endDate}
            })
            if (response.success) {
                
            }
        } catch (e) {

        }
    }
    useEffect()

    return <div>
      
  </div>;
};

export default Commission;
