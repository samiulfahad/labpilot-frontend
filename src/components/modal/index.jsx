/** @format */

import { Fragment } from "react";
import Spinner from "./Spinner";

const Modal = (props) => {
  const { type, title, onClose } = props;
  return (
    <Fragment>
      <div className="fixed inset-0 bg-blue-gray-800 bg-opacity-30 backdrop-blur-lg z-20 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full md:w-1/3 h-auto py-10 -mt-20 mx-auto bg-gray-100 px-10 rounded-md">
          {type === "error" && <p className="text-md text-center text-red-700">{title}</p>}
          {type === "processing" && (
            <div className="flex flex-col space-y-4 justify-center items-center">
              <p className="text-md text-center text-black">{title}</p>
              <Spinner />
            </div>
          )}

          {type === "dueCollection" && (
            <div>
              <div>
                <p>Invoice ID: {props.invoiceId}</p>
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

          {type === "success" && <p className="text-md text-center text-blue-gray-500">{title}</p>}

          <div className="flex space-x-8">
            {onClose && (
              <button onClick={onClose} className="button px-4 py-2 my-8 border-2 border-blue-600 rounded-lg font-bold">
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
