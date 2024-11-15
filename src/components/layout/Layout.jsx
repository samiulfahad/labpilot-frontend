import Nav from "./Nav";

const Layout = (props) => {
  return (
    <section className="layout-container">
      <div className="w-full min-h-screen flex bg-gray-200">
        <nav className="w-1/5 bg-blue-gray-500">
          <Nav />
        </nav>
        <main className="w-4/5">{props.children}</main>
      </div>
    </section>
  );
};

export default Layout;
