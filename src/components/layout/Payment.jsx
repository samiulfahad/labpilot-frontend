import React from "react";
import { Link } from "react-router-dom";
const Payment = () => {
  return (
    <>
      {/* Focused Financial Section */}
      <div className="font-mono bg-gradient-to-br from-gray-700/50 to-gray-800/60 transition-all duration-300 rounded-xl p-3 mt-2 shadow-xl hover:shadow-purple-500/20 group relative border border-gray-600/30">
        {/* Payable Highlight */}
        <div className="mb-2 space-y-1 bg-gradient-to-r from-teal-600/30 to-emerald-600/20 rounded-lg p-2 border border-teal-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent w-1/3" />
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <div className="mb-1.5">
                <p className="text-[0.7rem] font-medium text-teal-300/90 tracking-wide">Payable Now (50%)</p>
                <p className="text-[0.6rem] text-teal-200/70 mt-0.5">Billing Month: March, 2025</p>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-teal-100">1000</span>
                <span className="text-[0.75rem] text-teal-300/80">BDT</span>
              </div>
            </div>
            <div className="p-1.5 bg-teal-500/20 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-teal-400"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                fill="none"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Secondary Financial Info */}
        <div className="grid grid-cols-2 gap-2.5 text-gray-300">
          {/* Total Received */}
          <div className="space-y-1 bg-gray-600/20 rounded-md p-1">
            <p className="text-[0.7rem] text-gray-400/90 mb-0.5">Total Received</p>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-medium text-gray-200">2000</span>
              <span className="text-[0.7rem] text-gray-400/80">BDT</span>
            </div>
          </div>

          {/* Total Invoices */}
          <div className="space-y-1 bg-gray-600/20 rounded-md p-1">
            <p className="text-[0.7rem] text-gray-400/90 mb-0.5">Total Invoices</p>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-medium text-gray-200">400</span>
              <span className="text-[0.7rem] text-gray-400/80">inv</span>
            </div>
          </div>
        </div>

        {/* Pay Now Action */}
        <Link
          to="/pay"
          className="mt-2.5 w-full bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition-all duration-200 py-2 px-3 rounded-md shadow-lg hover:shadow-xl hover:shadow-emerald-500/20 flex items-center justify-center gap-1.5 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white transition-transform group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.2}
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="text-sm font-semibold text-white">Pay Now</span>
        </Link>
      </div>
    </>
  );
};

export default Payment;
