import { Metadata } from 'next'
import React from 'react'
import { Profile } from 'ui'
import { giveMetaData } from '../page'


export const metadata: Metadata = giveMetaData("PROFILE","This is profile page")
const page = () => {
  return (
<main className=''>
  <Profile/>
</main>
  )
}

export default page
