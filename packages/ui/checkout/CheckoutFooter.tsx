"use client";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { addressAtom, cartAtom, cartTotal, userAtom } from "store";
import Script from "next/script";
import { serverLink } from "../ServerLink";
import { CartItems } from "common";
export function CheckoutFooter() {
  const finalTotal = useRecoilValue(cartTotal);
  const address = useRecoilValue(addressAtom);
  const cartItems:CartItems[] = useRecoilValue(cartAtom);
  const user = useRecoilValue(userAtom);
  async function checkoutHandler() {
    if (!address) {
      console.log(address);
      console.log(cartItems)
     return alert("Please Select Address");
   
    }

    const { data } = await axios.post(
      `${serverLink}/order/checkout`,
      {
        cartItems: cartItems,
        cartTotal: finalTotal,
        address,
      },
      {
        withCredentials:true
      }
    );

    const options = {
      key: "rzp_test_LWJbzFhEywmrc4", // Enter the Key ID generated from the Dashboard
      amount: data?.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "FIT WEAR",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: data?.order?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${serverLink}/order/verify`,
      prefill: {
        name: user?.user?.name,
        email: user?.user?.email,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#6446e7",
      },
    };
    console.log(user.user?.email , user.user?.name , data?.order?.id + " ab open hua ")
    const paymentObject = new (window as any).Razorpay(options);

    paymentObject.open();
  }

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <footer className="user-order-and-total-footer">
        <div className="final-total">
          <h2 className="font-size-2rem">You Have To Pay</h2>
          <h2 className="font-size-2rem">{finalTotal}</h2>
        </div>
        <button
          onClick={checkoutHandler}
          className="proceed-to-pay-button purple-button"
        >
          Proceed To Pay
        </button>
      </footer>
    </>
  );
}
