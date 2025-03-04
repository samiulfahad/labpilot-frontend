
// Layout.jsx
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      {/* Sidebar with proper height constraints */}
      <nav className="w-64 fixed left-0 top-0 h-screen flex flex-col bg-gray-800/90 backdrop-blur-xl border-e border-gray-700/30 shadow-2xl shadow-black/20">
        <Navbar />
      </nav>

      <main className="ml-64 flex-1 min-h-screen bg-gradient-to-br from-gray-50/95 via-gray-100/95 to-white/95 backdrop-blur-sm px-8 py-6">
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout






// import Navbar from "./Navbar";

// const Layout = (props) => {
//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
//       {/* Sidebar */}
//       <nav className="w-1/5 fixed left-0 top-0 h-full 
//         bg-gray-800/95 
//         backdrop-blur-[12px]
//         border-e border-gray-700/40
//         shadow-[5px_0_15px_-3px] shadow-black/30">
//         <Navbar />
//       </nav>

//       {/* Main Content */}
//       <main className="w-4/5 ml-[20%] min-h-screen 
//         bg-gradient-to-br from-gray-50/95 via-gray-100/95 to-white/95
//         backdrop-blur-[1px]">
//         <div className="p space-y-6 
//           animate-in fade-in slide-in-from-bottom-3 duration-300">
//           {props.children}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Layout;