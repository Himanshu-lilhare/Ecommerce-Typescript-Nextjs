"use client";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { addressAtom, cartAtom, cartTotal, userAtom } from "store";
import Script from "next/script";
import { serverLink } from "../ServerLink";
import { CartItems } from "common";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export function CheckoutFooter() {
  const finalTotal = useRecoilValue(cartTotal);
  const address = useRecoilValue(addressAtom);
  const cartItems: CartItems[] = useRecoilValue(cartAtom);
  const setCartItems = useSetRecoilState(cartAtom);
  const user = useRecoilValue(userAtom);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  async function checkoutHandler(isOnCash: boolean) {
    if (!address) {
      console.log(address);
      console.log(cartItems);
      return alert("Please Select Address");
    }

    try {
      if (isOnCash) {
        setLoading(true);
      }

      const { data } = await axios.post(
        `${serverLink}/order/checkout`,
        {
          cartItems: cartItems,
          cartTotal: finalTotal,
          address,
          isOnCash,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );
      if (isOnCash && data.success) {
        setCartItems([]);
        setLoading(false);
        toast.success('Ordered Successfully')
        return router.push("/profile");
      }
      console.log(data);
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
        modal: {
          handleback: true,
          ondismiss: async () => {
            await axios.delete(`${serverLink}/deleteorder/${data?.order?.id}`, {
              withCredentials: true,
            });
          },
        },
      };
      console.log(
        user.user?.email,
        user.user?.name,
        data?.order?.id + " ab open hua "
      );
      const paymentObject = new (window as any).Razorpay(options);

      paymentObject.open();
    } catch (error) {}
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
          // onClick={checkoutHandler}
          onClick={() => setOpenModal(true)}
          className="proceed-to-pay-button purple-button"
        >
          Proceed To Pay
        </button>
        <PayModal open={openModal} close={() => setOpenModal(false)}>
          <div className="pay-modal-content">
            <button
              className="pink-button"
              onClick={() => checkoutHandler(true)}
            >
             {
              loading ? "Processing...." : "Cash On Delivery"
             } 
            </button>
            <button
              className="purple-button"
              onClick={() => checkoutHandler(false)}
            >
              Pay Online
            </button>
          </div>
        </PayModal>
      </footer>
    </>
  );
}

const PayModal = ({
  open,
  close,
  children,
}: {
  open: boolean;
  close: () => void;
  children: React.ReactNode;
}) => {
  if (!open) return null;
  return (
    <>
      <div className="pay-modal-overlay" onClick={close}>
        {" "}
      </div>
      <div className="pay-modal">{children}</div>
    </>
  );
};

export default PayModal;
