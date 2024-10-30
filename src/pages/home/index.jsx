import { Option, Select } from "@material-tailwind/react";
import SaleCard from "./SaleCard";

const Home = () => {
  const handleDetails = () => {};
  const months = [
    { name: "জানুয়ারি", value: "january" },
    { name: "ফেব্রুয়ারি", value: "january" },
    { name: "মার্চ", value: "january" },
    { name: "এপ্রিল", value: "january" },
    { name: "মে", value: "january" },
    { name: "জুন", value: "january" },
    { name: "জুলাই", value: "january" },
    { name: "অগাস্ট", value: "january" },
    { name: "সেপ্টেম্বর", value: "january" },
    { name: "অক্টোবর", value: "january" },
    { name: "নভেম্বর", value: "january" },
    { name: "ডিসেম্বর", value: "january" },
  ];
  return (
    <section>
      <div className="px-20 mx-auto mt-20">
        <div className="flex justify-center item-center gap-8">
          <SaleCard
            total={5000}
            due={2000}
            received={3000}
            commission={1000}
            onDetails={handleDetails}
            cardType="daily"
          />

          <SaleCard
            total={200000}
            due={15000}
            received={200000 - 15000}
            commission={25000}
            onDetails={handleDetails}
          />

          <div className="flex flex-col gap-4 w-60">
            <p className="font-bold">নির্দিষ্ট মাসের হিসাব</p>
            <Select label="হিসাবের মাস">
              {months.map((item) => (
                <Option key={item.name} value={item.value}>{item.name}</Option>
              ))}
            </Select>
            <Select label="সাল">
              <Option value="2024">২০২৪</Option>
              <Option value="2023">২০২৩</Option>
            </Select>
            <button className="px-4 py-2 text-white bg-blue-gray-500">
              হিসাব দেখুন
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
