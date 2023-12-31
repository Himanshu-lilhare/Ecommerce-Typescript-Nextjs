import { NextFunction, Request, Response } from "express";
import { tryCatchWrapper } from "../middleware/tryCatchWrapper";
import { CustomRequest } from "../middleware/Authenticae";
import { CustomError } from "../middleware/custumErrorClass";
import { instance } from "..";
import { orderModel } from "../model/order";
import crypto from "crypto";
import { IOrder } from "common";

export const getOrders = tryCatchWrapper(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    let user = req.user;

    let orders: IOrder[] = await orderModel
      .find({ userId: user?._id })
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  }
);

export const deleteOrder = tryCatchWrapper(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
  
    let orderId = req.params.orderId

    if(!orderId) return next(new CustomError("Please Provide OrderId",400))

    await orderModel.deleteOne({orderId})
    res.status(200).json({ message:"deleted Successfully" });
  }
);

export const Checkout = tryCatchWrapper(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    let user = req.user;

    if (!user) next(new CustomError("you are not logged in", 400));
    const body = req?.body;
    if (body.isOnCash) {
      let dataToBeInsert = {
        userId: user && user._id,
        address: body?.address,
        orderItems: body?.cartItems.map((item: any) => {
          return {
            _id: item?.oneProduct,
            qty: item?.qty,
          };
        }),
        paymentInfo: {
          amountPaid: Math.ceil(body.cartTotal),
        },
      };
     const order =  await orderModel.create(dataToBeInsert);
     if (user) {
      user.cart = undefined;
      await user.save();
    }
res.status(200).json({success:true})
    } else {
      let options = {
        amount: Math.ceil(body.cartTotal) * 100,
        currency: "INR",
      };
      console.log("order create karne bhi aaya");
      console.log(user && user._id);
      let data = await instance.orders.create(options);

      //   async(err, data) => {
      //   if (err) {
      //     return console.log("error aayyi");
      //   }

      let dataToBeInsert = {
        orderId: data.id,
        userId: user && user._id,
        address: body?.address,
        orderItems: body?.cartItems.map((item: any) => {
          return {
            _id: item?.oneProduct,
            qty: item?.qty,
          };
        }),
        paymentInfo: {
          id: "qwe", // for now we give random id , after payment verify we will give real id

          amountPaid: Math.ceil(body.cartTotal),
        },
      };
      let createdOrderInDb = await orderModel.create(dataToBeInsert);
console.log(createdOrderInDb)
      res.status(200).json({
        order: data,
      });
    }
  }
);

export const paymentVerification = tryCatchWrapper(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.body.razorpay_signature)
      return res.send({ message: "invalid reqwuest" });
    let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    console.log(req.body.razorpay_order_id + " ye server me order id");
    const expectedSignature = crypto
      .createHmac("sha256", "Ulw083J2EWSbkEQ748AlfVQ7")
      .update(body.toString())
      .digest("hex");

    console.log(" expected signature ", expectedSignature);
    console.log("  signature ", req.body.razorpay_signature);

    if (expectedSignature === req.body.razorpay_signature) {
      let order = await orderModel.findOneAndUpdate(
        { orderId: req.body.razorpay_order_id },
        {
          $set: {
            "paymentInfo.id": req.body.razorpay_payment_id,
            "paymentInfo.status": "paid",
          },
        }
      );

      if (!order) return res.send({ message: "fuckOff" });

      let user = req.user;
      if (user) {
        user.cart = undefined;
        await user.save();
      }

      res.status(200).redirect(`http://localhost:3000/profile?orderId=${order.orderId}`);
    } else {
      res.status(400).json({ message: "Hey Fake Guy" });
    }
  }
);
