"use client"


import axios from 'axios'
import { Props } from './Product'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { cartAtom, userAtom } from 'store'
import { serverLink } from '../ServerLink'
import {useRouter} from "next/navigation"
import { useState } from 'react'
import { toast } from 'react-hot-toast'
const AddToCartButton = ({product}:Props) => {
const setCartItems = useSetRecoilState(cartAtom)
const user = useRecoilValue(userAtom)
const router = useRouter()
const [loading,setLoading] = useState<boolean>(false)
async function addToCart(){
if(!user.isAuthenticated) return router.push("/login")
try {
  setLoading(true)
const {data} = await axios.post(`${serverLink}/addToCart`,{
  productId:product._id,
  qty:1
},{
  headers:{
    "Content-Type":"application/json"
  },
  withCredentials:true
})

setCartItems(data.userCart)
toast.success("Added To Cart")
setLoading(false)
} catch (error:any) {
  setLoading(false)
  toast.error(error?.response?.data?.message ? error.response.data.message : error?.message)
}

}
  return (
   <button className='add-to-cart-button' onClick={addToCart}>
    {
      loading ? "Adding....." : "ADD TO CART"
    } 
   </button>
  )
}

export default AddToCartButton