/** @format */

const InvoiceData = (props) => {
  const { total, discount, afterDiscount, labAdjustment, netAmount, paid, hasDiscount, discountType, referrer } =
    props.data;
  const due = netAmount - paid;

 

  return (
    <div className="bg-blue-gray-700 w-auto text-white rounded-lg shadow-lg px-4 py-2">
      {/* <h2 className="text-2xl text-center font-semibold mb-4">Invoice Summary</h2> */}
      <div className="flex justify-between mb-2">
        <p>মোট:</p>
        <p>{total} টাকা</p>
      </div>

      {referrer && referrer.discountAmount !== 0 && (
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

      {hasDiscount && referrer && (
        <>
          <div className="flex justify-between text-sm mb-2 items-center">
            <label htmlFor="discount">ডিস্কাউন্ট:</label>
            <div className="flex items-center">
              <input
                type="number"
                id="discount"
                className="p-1 w-20 text-right text-black outline-none border border-gray-300 rounded-md mr-2"
                value={discount}
                onChange={(e) => props.onDiscount(e.target.value, referrer)}
              />
              <span>{discountType === "fixed" ? "টাকা" : "%"}</span>
            </div>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <p>ডিস্কাউন্ট পরবর্তী মূল্য:</p>
            <p className="">{afterDiscount} টাকা</p>
          </div>
        </>
      )}

      <div className="flex justify-between mb-2 text-sm items-center">
        <label htmlFor="labAdjustment">ল্যাব প্রদত্ত ছাড়:</label>
        <div className="flex items-center">
          <input
            type="number"
            className="p-1 border w-20 outline-none text-black text-right border-gray-300 rounded-md mr-2"
            value={labAdjustment}
            onChange={(e) => props.onLabAdjustment(parseFloat(e.target.value) || 0)}
            onKeyDown={(e) => {
              if (e.code === "ArrowUp" || e.code === "ArrowDown") {
                e.preventDefault();
              }
            }}
            onWheel={(e) => e.target.blur()} // Remove focus to prevent scroll
            onFocus={(e) => e.target.addEventListener("wheel", (ev) => ev.preventDefault(), { passive: false })}
            onBlur={(e) => e.target.removeEventListener("wheel", (ev) => ev.preventDefault())}
          />
          <span>টাকা</span>
        </div>
      </div>
      <div className="flex justify-between mb-2">
        <p className="text-md font-semibold">Net Amount:</p>
        <p className="font-semibold text-md">{netAmount} টাকা</p>
      </div>
      <hr className="my-2 border-t border-gray-300" />
      <div className="flex justify-between mb-2 items-center">
        <label htmlFor="paid">নগদ:</label>
        <div className="flex items-center">
          <input
            type="number"
            className="p-1 border w-20 outline-none text-black text-right border-gray-300 rounded-md mr-2"
            value={paid}
            onChange={(e) => props.onPay(parseFloat(e.target.value) || 0)}
            onKeyDown={(e) => {
              if (e.code === "ArrowUp" || e.code === "ArrowDown") {
                e.preventDefault();
              }
            }}
            onWheel={(e) => e.target.blur()} // Remove focus to prevent scroll
            onFocus={(e) => e.target.addEventListener("wheel", (ev) => ev.preventDefault(), { passive: false })}
            onBlur={(e) => e.target.removeEventListener("wheel", (ev) => ev.preventDefault())}
          />
          <span>টাকা</span>
        </div>
      </div>

      <div className="flex justify-between text-white mb-2">
        <p className="font-semibold">বাকি:</p>
        <p className="font-semibold">{due} টাকা</p>
      </div>
    </div>
  );
};

export default InvoiceData;
