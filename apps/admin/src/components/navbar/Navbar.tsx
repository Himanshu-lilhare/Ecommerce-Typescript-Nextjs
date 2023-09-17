import "./navbar.scss";
// import Image from "next/image"
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        {/* <img src="logo.svg" alt="adminLogo" /> */}
        <h1>FIT-ADMIN</h1>
      </div>
      <div className="icons">
        <div className="admin-icons">
          <img src="/adminpic.jpg" alt="admin-pic" className="admin-pic" />
          <span>Raj </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
