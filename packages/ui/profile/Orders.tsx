"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { activeButtonAtom, barData } from "store";
import { serverLink } from "../ServerLink";
import { IOrder } from "common";
import Link from "next/link";
import Image from "next/image";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Orders = () => {
  const activeButton = useRecoilValue(activeButtonAtom);

  if (activeButton === barData[0]) {
    return <AllOrders />;
  } else {
    return <></>;
  }
};

export default Orders;

function AllOrders() {
  const [orders, setOrders] = useState<IOrder[] | null | []>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        const { data } = await axios.get(`${serverLink}/getOrders`, {
       
          withCredentials: true,
          
        });

        setOrders(data.orders);
        setLoading(false);
      } catch (error: any) {
        alert(error.message);
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);
  if (loading) {
    return <h1>Loading</h1>;
  }
  if (!orders || orders.length === 0) {
    return (
      <Image
      className="no-order-image"
        width={750}
        height={720}
        alt="no-orders"
        src={
          "https://res.cloudinary.com/dtjpdqgb6/image/upload/v1693052549/Orders-No-order_c4pczo.webp"
        }
      />
    );
  }

  return (
    <main className="profile-orders-main light-border">
      {orders &&
        orders.map((order: IOrder, index: number) => {
          return <Order key={index} order={order} />;
        })}
    </main>
  );
}

function Order({ order }: { order: IOrder }) {
  let date = new Date(order.createdAt);
  let month = date.getMonth();
  let tarik = date.getDate();
  let weekDay = date.getDay();
  return (
    <>
      <Link
        className="profile-order light-border"
        style={{ textDecoration: "none", color: "black" }}
        href={"/"}
      >
        <div className="profile-single-order">
          <h3 className="profile-order-date pdd">
            Order-Date: {tarik} {months[month]} {daysOfWeek[weekDay]}{" "}
            {date.getFullYear()}
          </h3>
        </div>
        <div className="profile-single-order ">
          <h3 className="profile-orderid pdd">Order-Id : {order.orderId ? order.orderId : order._id.toString()}</h3>
        </div>
        <div className="profile-single-order">
          <h3 className="profile-order-status pdd">
            Payment-Status:{" "}
            <span style={{ color: "green" }}>{order.paymentInfo.status}</span>
          </h3>
        </div>
      </Link>
    </>
  );
}
