/** @format */

import { NavLink } from "react-router-dom";

const NavItem = (props) => {
  return (
    <>
      <NavLink
        to={props.path}
        className="px-2 text-lg w-50 text-center py-[2px] textColor hover:text-white hover:bg-slate-800 duration-200 font-semibold"
      >
        {props.label}
      </NavLink>
    </>
  );
};
export default NavItem;
