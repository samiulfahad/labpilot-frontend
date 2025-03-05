// Navbar.jsx
import { useAuth } from "../../context/auth";
import NavItem from "./NavItem";
import navList from "./navList";

const Navbar = () => {
  const { logout } = useAuth();
  
  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-4 py-2">
      
      {/* Stats Section */}
      <div className="mb-4 px-3 py-4 bg-gray-700/20 rounded-xl backdrop-blur-sm">
        <div className="text-center text-sm text-gray-300">
          <p className="font-semibold text-emerald-400">Total Invoices</p>
          <p className="text-2xl font-bold mt-1">125</p>
          <p className="text-xs mt-2 opacity-75">November 2023</p>
          <div className="mt-3 h-2 bg-gray-600/30 rounded-full">
            <div className="w-2/3 h-full bg-emerald-500 rounded-full" />
          </div>
          <p className="text-xs mt-2 opacity-75">100 more to free tier</p>
        </div>
      </div>

      {/* Scrollable Navigation Items */}
      <div className="flex-1 overflow-y-auto pb-2">
        <div className="space-y-1">
          {navList.map((item, index) => (
            <NavItem key={index} {...item} />
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="pt-4 mt-auto border-t border-gray-700/30">
        <button 
          onClick={logout}
          className="w-full px-4 py-2 bg-gray-700/30 hover:bg-red-600/90 transition-all duration-300 rounded-xl text-white font-semibold text-sm flex items-center justify-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;


// const Navbar = () => {
//   const { logout } = useAuth();
//   const handleLogout = () => {
//     logout();
//   };
//   return (
//     <>
//       <div className="bg-sky-700 text-gray-200 text-sm mt-4 font-bold rounded-full mx-auto flex justify-center items-center h-24 w-24">
//         <Link to={"/recharge"} className="mx-auto text-center">
//           <p>৳5000</p>
//           <p className="">Recharge</p>
//         </Link>
//       </div>
//       <div className="text-center text-[12px] text-gray-200">
//         <p>Total Invoice (November): 125</p>
//         <p>FREE after 100 More</p>
//       </div>
//       <div className="flex flex-col justify-center items-center my-1">
//         {navList.map((item, index) => (
//           <NavItem key={index} label={item.label} path={item.path} />
//         ))}
//       </div>
      
//       <button onClick={handleLogout} className="text-white cursor-pointer font-bold text-md w-full">
//         Logout
//       </button>
//     </>
//   );
// };

// export default Navbar;
