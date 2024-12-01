/** @format */

import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import navList from "./navList";

const Nav = () => {
  return (
    <>
    
      <div className="bg-blue-gray-900 text-gray-200 text-sm mt-4 font-bold rounded-full mx-auto flex justify-center items-center h-24 w-24">
        <Link to={"/recharge"} className="mx-auto text-center">
          <p>৳5000</p>
          <p className="">Recharge</p>
        </Link>
      </div>
      <div className="text-center text-[12px] text-gray-200">
        <p>Total Invoice (November): 125</p>
        <p>FREE after 100 More</p>
      </div>
      <div className="flex flex-col justify-center items-center my-2">
        {navList.map((item, index) => (
          <NavItem key={index} label={item.label} path={item.path} />
        ))}
      </div>
    </>
  );
};

export default Nav;
