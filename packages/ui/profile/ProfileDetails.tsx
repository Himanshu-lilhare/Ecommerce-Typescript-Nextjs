"use client"
import { useRecoilValue } from 'recoil';
import { activeButtonAtom, barData } from 'store';
import Image from "next/image";
const ProfileDetails = () => {
    const activeButton = useRecoilValue(activeButtonAtom);
 
if(activeButton === barData[1]){
    return <div className='under-construction-image-div'>
        <Image className='under-construction-image' width={200} height={200} alt='under-construction' src={'https://res.cloudinary.com/dtjpdqgb6/image/upload/v1693152276/under-construction-yom_qv6cqc.png'}/>

        </div>}
}

export default ProfileDetails