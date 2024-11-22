import Nav from "./Nav";

const Layout = (props) => {
  return (
    <section className="layout-container">
      <div className="w-full min-h-screen flex bg-gray-400">
        <nav className="w-1/5 bg-blue-gray-700">
          <Nav />
        </nav>
        <main className="w-4/5 bg-blue-gray-100">{props.children}</main>
      </div>
    </section>
  );
};

export default Layout;
