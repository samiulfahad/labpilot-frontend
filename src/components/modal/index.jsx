/** @format */

import { Fragment } from "react";
import Spinner from "./Spinner";

const Modal = (props) => {
  const { type, title, onClose } = props;
  return (
    <Fragment>
      <div className="fixed inset-0 bg-blue-gray-300 bg-opacity-10 backdrop-blur-sm z-20 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full md:w-1/3 h-auto py-10 -mt-20 mx-auto bg-gray-200 px-10 rounded-md">
          {type === "error" && <p className="text-md text-center text-red-700">{title}</p>}
          {type === "processing" && (
            <div className="flex flex-col space-y-4 justify-center items-center">
              <p className="text-md text-center text-black">{title}</p>
              <Spinner />
            </div>
          )}

          {type === "dueCollection" && (
            <div className="w-3/5 mx-auto">
              <p className="text-md font-bold text-center">{title}</p>
              <div>
                <p className="text-sm">Invoice ID: {props.invoiceId}</p>
                <p>নামঃ {props.name}</p>
                <p>মোবাইলঃ {props.contact}</p>
                <p className="pt-4">মোটঃ {props.netAmount}</p>
                <p className="pb-2 border-b-2 border-blue-gray-500">জমাঃ {props.paid}</p>
                <p className="pt-2 text-red-500 font-bold">বাকিঃ {props.netAmount - props.paid}</p>
              </div>
              <div className="flex justify-between mt-4">
                <button onClick={props.onDueCollection} className="btn-sm">
                  Collect Due
                </button>
                <button onClick={props.onClosingModal} className="btn-sm !bg-white !text-blue-gray-500">
                  Close
                </button>
              </div>
            </div>
          )}

          {type === "reportDelivery" && (
            <div className="w-4/5 mx-auto">
              <p className="text-md font-bold text-center">{title}</p>
              <div className="text-justify">
                <p className="text-sm">Invoice ID: {props.invoiceId}</p>
                <p>নামঃ {props.name}</p>
                <p>মোবাইলঃ {props.contact}</p>
                {props.netAmount === props.paid && <p className="text-green-500 font-bold">সম্পূর্ণ টাকা পরিশোধিত</p>}
                {props.netAmount > props.paid && <p className="text-red-500 font-bold">বকেয়াঃ {props.netAmount - props.paid}</p>}
                <p className="text-justify text-sm"> এই ইনভয়েসের অন্তর্ভুক্ত রিপোর্ট কাস্টমারকে ডেলিভারি দিয়েছেন? নিশ্চিত করতে Confirm বাটনে ক্লিক
                  করুন
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <button onClick={props.onReportDelivery} className="btn-sm">
                  Confirm
                </button>
                <button onClick={props.onClosingModal} className="btn-sm !bg-white !text-blue-gray-500">
                  Close
                </button>
              </div>
            </div>
          )}

          {type === "success" && <div className="text-md text-center text-blue-gray-500">{title}</div>}

          <div className="flex space-x-8">
            {onClose && (
              <button onClick={onClose} className="button px-4 py-2 my-8 border-2 border-blue-gray-500 rounded-lg font-bold">
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
