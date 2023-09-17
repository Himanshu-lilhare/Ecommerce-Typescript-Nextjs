import React from 'react'
import {Login} from "ui"
import { giveMetaData } from '../page'


export const metadata = giveMetaData("FIT-WEAR-LOGIN",'This is login page')
const page = () => {
  return (
<main className='pad'>
<Login/>
</main>
  )
}

export default page


