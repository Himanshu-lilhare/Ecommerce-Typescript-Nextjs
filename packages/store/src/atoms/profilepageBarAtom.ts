import { atom } from "recoil";

export const barData = ["Orders", "Profile-Details"];

export const activeButtonAtom = atom<string>({
    key:'activeButtonAtom',
    default:barData[0]

})