"use client"


import axios from 'axios'
import { Props } from './Product'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { cartAtom, userAtom } from 'store'
import { serverLink } from '../ServerLink'
import {useRouter} from "next/navigation"
const AddToCartButton = ({product}:Props) => {
const setCartItems = useSetRecoilState(cartAtom)
const user = useRecoilValue(userAtom)
const router = useRouter()
async function addToCart(){
if(!user.isAuthenticated) return router.push("/login")
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

}
  return (
   <button className='add-to-cart-button' onClick={addToCart}>
    ADD TO CART
   </button>
  )
}

export default AddToCartButton