import { NavLink } from "react-router-dom";

const NavItem = (props) => {
  return (
    <>
      <NavLink to={props.path} className="px-2 border-b border-white w-50 text-center py-1 text-white font-bold">
        {props.label}
      </NavLink>
    </>
  );
};
export default NavItem