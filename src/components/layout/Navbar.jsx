// Navbar.jsx
import { useAuth } from "../../context/auth";
import NavItem from "./NavItem";
import navList from "./navList";
import { Link } from "react-router-dom";
import Payment from "./Payment";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-3 py-4 bg-gradient-to-b from-gray-900 to-gray-800">
      <Payment />
      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto pb-2 mt-4">
        <div className="space-y-1">
          {navList.map((item, index) => (
            <NavItem key={index} {...item} />
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="pt-3 mt-auto border-t border-gray-700/30">
        <button
          onClick={logout}
          className="font-mono w-full px-3 py-2 bg-gradient-to-br from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 rounded-lg text-gray-300 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md hover:shadow-gray-600/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-400"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;