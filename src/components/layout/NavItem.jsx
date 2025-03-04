// NavItem.jsx
import { NavLink } from "react-router-dom";

const NavItem = ({ label, path, icon }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => 
        `flex items-center space-x-3 px-4 py-1 rounded-xl transition-all duration-300
         ${isActive 
           ? 'bg-sky-700/90 text-white shadow-lg shadow-sky-900/30' 
           : 'text-gray-300 hover:bg-gray-700/40 hover:text-white'}`
      }
    >
      {icon && (
        <span className="text-lg opacity-80">
          {icon}
        </span>
      )}
      <span className="text-sm font-medium tracking-wide">{label}</span>
    </NavLink>
  );
};

export default NavItem;


// /** @format */

// import { NavLink } from "react-router-dom";

// const NavItem = (props) => {
//   return (
//     <>
//       <NavLink
//         to={props.path}
//         className="px-2 text-lg w-50 text-center py-[2px] textColor hover:text-white hover:bg-slate-700 duration-200 font-semibold"
//       >
//         {props.label}
//       </NavLink>
//     </>
//   );
// };
// export default NavItem;
