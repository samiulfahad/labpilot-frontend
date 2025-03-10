/** @format */

const InvoiceData = (props) => {
  const { total, discount, afterDiscount, labAdjustment, netAmount, paid, hasDiscount, referrer } = props.data;
  const due = netAmount - paid;

  return (
    <div className="bgColor font-mono w-auto text-white rounded-lg shadow-lg px-4 py-2">
      {/* <h2 className="text-2xl text-center font-semibold mb-4">Invoice Summary</h2> */}
      <div className="flex justify-between mb-2">
        <p>Total</p>
        <p>{total} Tk</p>
      </div>

      {referrer && referrer._id !== null && (
        <div className="flex justify-start space-x-4 py-1 items-center">
          <p className="text-sm">কমিশনভোগী ব্যক্তি বা প্রতিষ্ঠান কোনো ডিস্কাউন্ট দিয়েছে কি?</p>
          <p
            onClick={() => props.handleHasDiscount(false)}
            className={`${!hasDiscount ? "px-2 py-1 bg-blue-gray-900 text-white" : "text-gray-500"}`}
          >
            না
          </p>
          <p
            onClick={() => props.handleHasDiscount(true)}
            className={`${hasDiscount ? "px-2 py-1 bg-blue-gray-900 text-white" : "text-gray-500"}`}
          >
            হ্যাঁ
          </p>
        </div>
      )}

      {hasDiscount && referrer._id && (
        <>
          <div className="flex justify-between text-sm mb-2 items-center">
            <label htmlFor="discount">ডিস্কাউন্ট:</label>
            <div className="flex items-center">
              <input
                type="number"
                id="discount"
                className="p-1 w-20 text-right outline-none border border-gray-300 rounded-md mr-2 pr-4 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none 
             [-moz-appearance:textfield"
                value={discount}
                onChange={(e) => {
                  const value = parseFloat(e.target.value || 0);
                  if (value >= 0) {
                    props.onDiscount(value, referrer);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.code === "ArrowUp" || e.code === "ArrowDown") {
                    e.preventDefault();
                  }
                }}
              />
              <span>{referrer.commissionType === "percentage" ?  "%" :"Tk"}</span>
            </div>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <p>ডিস্কাউন্ট পরবর্তী মূল্য:</p>
            <p className="">{afterDiscount} Tk</p>
          </div>
        </>
      )}

      <div className="flex justify-between mb-2 text-sm items-center">
        <label htmlFor="labAdjustment">Lab Discount</label>
        <div className="flex items-center">
          <input
            type="number"
            className="p-1 border w-20 outline-none text-right border-gray-300 rounded-md mr-2 pr-4 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none 
             [-moz-appearance:textfield"
            value={labAdjustment}
            onChange={(e) => {
              const value = parseFloat(e.target.value || 0);
              if (value >= 0 && value <= total) {
                props.onLabAdjustment(value, referrer);
              }
            }}
            onKeyDown={(e) => {
              if (e.code === "ArrowUp" || e.code === "ArrowDown") {
                e.preventDefault();
              }
            }}
            onWheel={(e) => e.target.blur()} // Remove focus to prevent scroll
            onFocus={(e) => e.target.addEventListener("wheel", (ev) => ev.preventDefault(), { passive: false })}
            onBlur={(e) => e.target.removeEventListener("wheel", (ev) => ev.preventDefault())}
          />
          <span>Tk</span>
        </div>
      </div>
      <div className="flex justify-between mb-2">
        <p className="text-md font-semibold">Net Amount:</p>
        <p className="font-semibold text-md">{netAmount} Tk</p>
      </div>
      <hr className="my-2 border-t border-gray-300" />
      <div className="flex justify-between mb-2 items-center">
        <label htmlFor="paid">নগদ:</label>
        <div className="flex items-center">
          <input
            type="number"
            className="p-1 border w-20 outline-none text-right border-gray-300  rounded-md pr-4 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none 
             [-moz-appearance:textfield]"
            value={paid}
            onChange={(e) => {
              const value = parseFloat(e.target.value || 0);
              if (value >= 0 && value <= netAmount) {
                props.onPay(value, referrer);
              }
            }}
            onKeyDown={(e) => {
              if (e.code === "ArrowUp" || e.code === "ArrowDown") {
                e.preventDefault();
              }
            }}
            onWheel={(e) => e.target.blur()} // Remove focus to prevent scroll
            onFocus={(e) => e.target.addEventListener("wheel", (ev) => ev.preventDefault(), { passive: false })}
            onBlur={(e) => e.target.removeEventListener("wheel", (ev) => ev.preventDefault())}
          />
          <span>Tk</span>
        </div>
      </div>

      <div className="flex justify-between text-white mb-2">
        <p className="font-semibold">বাকি:</p>
        <p className="font-semibold">{due} Tk</p>
      </div>
    </div>
  );
};

export default InvoiceData;
