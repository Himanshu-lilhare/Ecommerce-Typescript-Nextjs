import React from 'react'
import { Checkout } from 'ui'
import { giveMetaData } from '../page'


export const metadata =giveMetaData('CHECKOUT',"This is checkout page")
const page = () => {
  return (
    <div className='pad checkout'>
        <Checkout/>
    </div>
  )
}

export default page