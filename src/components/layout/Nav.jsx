import NavItem from "./NavItem";
import navList from "./navList";

const Nav = () => {
  return (
    <>
      <div className="flex flex-col my-4">
        {navList.map((item, index) => (
          <NavItem key={index} label={item.label} path={item.path} />
        ))}
      </div>
    </>
  );
};

export default Nav;
