import Navbar from "./Navbar";

const Layout = (props) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      {/* Sidebar */}
      <nav className="w-1/5 fixed left-0 top-0 h-full 
        bg-gray-800/95 
        backdrop-blur-[12px]
        border-e border-gray-700/40
        shadow-[5px_0_15px_-3px] shadow-black/30">
        <Navbar />
      </nav>

      {/* Main Content */}
      <main className="w-4/5 ml-[20%] min-h-screen 
        bg-gradient-to-br from-gray-50/95 via-gray-100/95 to-white/95
        backdrop-blur-[1px]">
        <div className="p space-y-6 
          animate-in fade-in slide-in-from-bottom-3 duration-300">
          {props.children}
        </div>
      </main>
    </div>
  );
};

export default Layout;













// import Navbar from "./Navbar";

// const Layout = (props) => {
//   return (
//     <section className="layout-container">
//       <div className="flex w-full min-h-screen bg-gray-400">
//         <nav className="w-1/5 bg-slate-700 fixed top-0 left-0 h-full">
//           <Navbar />
//         </nav>
//         <main className="w-4/5 ml-[20%] bg-slate-100">{props.children}</main>
//       </div>
//     </section>
//   );
// };

// export default Layout;
