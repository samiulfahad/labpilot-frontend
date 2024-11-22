/** @format */

import { NavLink } from "react-router-dom";

const NavItem = (props) => {
  return (
    <>
      <NavLink
        to={props.path}
        className="px-2  w-50 text-justify py-1 textColor hover:text-white hover:bg-blue-gray-800 duration-200 font-semibold"
      >
        {props.label}
      </NavLink>
    </>
  );
};
export default NavItem;
