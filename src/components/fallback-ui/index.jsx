/** @format */

import React from "react";

const FallbackUI = () => {
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="text-justify">
              <p>দুঃখিত, একটি সমস্যার হয়েছে। তাই আপনার Request টি আমরা সফলভাবে পূরণ করতে পারিনি।</p>
              <p className="text-center font-semibold">=======সম্ভাব্য কারণ ও সমাধান======= </p>
        <p className="font-bold text-lg text-red-500">ইন্টারনেট সংযোগ Check করে দেখুন</p>
              <p>অথবা পেইজটি Refresh / Reload করুন</p>
              <p>অথবা সার্ভারের সমস্যার কারণেও এমনটি হতে পারে (যার সম্ভাবনা খুবই কম)</p>
      </div>
      <div>
        <button onClick={handleReload} className="btn">Refresh</button>
      </div>
    </div>
  );
};

export default FallbackUI;
