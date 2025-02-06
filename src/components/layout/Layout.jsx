import Navbar from "./Navbar";

const Layout = (props) => {
  return (
    <section className="layout-container">
      <div className="flex w-full min-h-screen bg-gray-400">
        <nav className="w-1/5 bg-slate-700 fixed top-0 left-0 h-full">
          <Navbar />
        </nav>
        <main className="w-4/5 ml-[20%] bg-slate-100">{props.children}</main>
      </div>
    </section>
  );
};

export default Layout;
