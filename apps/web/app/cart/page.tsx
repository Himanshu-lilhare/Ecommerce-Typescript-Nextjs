import { Metadata } from 'next'
import React from 'react'
import { Cart } from 'ui'
export const metadata: Metadata = {
  title: 'CART',
  description: 'Here is the cart of FIT WEAR',
}
const page = () => {
  return (
    <main className='pad' style={{width:"100%"}}>
     <Cart/>
    </main>
  )
}

export default page