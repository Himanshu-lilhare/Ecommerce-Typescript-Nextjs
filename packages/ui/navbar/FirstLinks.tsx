"use client";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { menuAtom } from "store";
const FirstLinks = () => {
  const [menu, setMenu] = useRecoilState(menuAtom);

  const closeNavbar = useCallback(() => {
    setMenu(false);
  }, [setMenu]);

  useEffect(() => {
    const closeNavbarOnClickOutside = (e: any) => {
      if (menu && !e.target.closest(".first-links")) {
        closeNavbar();
      }
    };

    document.addEventListener("click", closeNavbarOnClickOutside);

    return () => {
      document.removeEventListener("click", closeNavbarOnClickOutside);
    };
  }, [menu, closeNavbar]);
  return (
    <div
      className={menu ? "first-links first-links-d-flex" : "first-links-d-none"}
    >
      <Link onClick={() => closeNavbar()} href={"/"}>
        Home
      </Link>
      <Link onClick={() => closeNavbar()} href={"/shop"}>
        Shop
      </Link>
    </div>
  );
};

export default FirstLinks;
