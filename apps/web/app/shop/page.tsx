import React from 'react'
import { AllProducts } from 'ui'

const Shop = ({searchParams}:any) => {
  console.log(searchParams)
  return (
    <main className='pad' style={{minHeight:"100vh"}}>
<AllProducts searchParams={searchParams}/>
    </main>
  )
}

export default Shop