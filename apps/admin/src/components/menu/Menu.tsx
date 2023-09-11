import { NavLink } from "react-router-dom";
import "./menu.scss";
import { Link } from "react-router-dom";
const Menu = () => {
  return (
    <div className="menu">
      <div className="item">
        <NavLink
          to={"/"}
          className={({ isActive, isPending }) => {
            return `menu-link ${isActive && "active"}`;
          }}
        >
          <img src="/home.svg" alt="home-cicon" />
          <span className="menu-link-title">Home</span>
        </NavLink>
        <NavLink
          to={"/users"}
          className={({ isActive, isPending }) => {
            return `menu-link ${isActive && "active"}`;
          }}
        >
          <img src="/user.svg" alt="user-cicon" />
          <span className="menu-link-title">Users</span>
        </NavLink>
        <NavLink
          to={"/products"}
          className={({ isActive, isPending }) => {
            return `menu-link ${isActive && "active"}`;
          }}
        >
          <img src="/product.svg" alt="home-cicon" />
          <span className="menu-link-title">Products</span>
        </NavLink>
        <NavLink
          to={"/orders"}
          className={({ isActive, isPending }) => {
            return `menu-link ${isActive && "active"}`;
          }}
        >
          <img src="/order.svg" alt="home-cicon" />
          <span className="menu-link-title">Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Menu;
