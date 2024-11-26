import Nav from "./Nav";

const Layout = (props) => {
  return (
    <section className="layout-container">
      <div className="flex w-full min-h-screen bg-gray-400">
        <nav className="w-1/5 bg-blue-gray-700 fixed top-0 left-0 h-full">
          <Nav />
        </nav>
        <main className="w-4/5 ml-[20%] bg-blue-gray-100">{props.children}</main>
      </div>
    </section>
  );
};

export default Layout;
