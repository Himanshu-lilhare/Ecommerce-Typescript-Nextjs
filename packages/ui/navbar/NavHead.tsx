import Link from "next/link";
const NavHead = (props:{smallSize:boolean}) => {
  return (
    <Link
      style={{ textDecoration: "none", color: "var(--primary-textcolor)" }}
      href={"/"}
    >
      <h1 className="nav-head"> {props.smallSize ? "F-W" : "Fit-Wear"} </h1>
    </Link>
  );
};

export default NavHead;
