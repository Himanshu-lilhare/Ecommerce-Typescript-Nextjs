import "./menu.scss";
import { Link } from "react-router-dom";
const Menu = () => {
  return (
    <div className="menu">
      <div className="item">
        <Link to={"/"} className="menu-link">
          <img src="/home.svg" alt="home-cicon" />
          <span className="menu-link-title">Home</span>
        </Link>
        <Link to={"/"} className="menu-link">
          <img src="/home.svg" alt="home-cicon" />
          <span className="menu-link-title">Home</span>
        </Link>
        <Link to={"/"} className="menu-link">
          <img src="/home.svg" alt="home-cicon" />
          <span className="menu-link-title">Home</span>
        </Link>
        <Link to={"/"} className="menu-link">
          <img src="/home.svg" alt="home-cicon" />
          <span className="menu-link-title">Home</span>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
