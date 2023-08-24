"use client";
import React, { useState , MouseEvent } from "react";
import { useRecoilState } from "recoil";
import { activeButtonAtom, barData } from "store";

interface CustomEventTarget extends EventTarget {
  textContent :string
}

const ProfilepageBar = () => {
  const [activeButton,setActiveButton] = useRecoilState(activeButtonAtom)
  function activeBarHandler(e:MouseEvent<HTMLButtonElement>) {
  setActiveButton((e.target as CustomEventTarget).textContent)
  }
  return (
    <div className="profile-page-bar">
      {barData.map((data, index) => {
        return (
          <button className={`light-border profile-page-bar-button ${activeButton===data ? "active-profile-page-bar-button" : "" }`} key={index} onClick={activeBarHandler}>
            {data}
          </button>
        );
      })}
    </div>
  );
};

export default ProfilepageBar;
