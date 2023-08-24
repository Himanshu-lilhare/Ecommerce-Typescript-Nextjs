import mongoose from "mongoose";
import { string } from "zod";

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  address: {
    street: String,
    city: String,
    state: String,
    phone: String,
    zipcode: String,
    country: String,
  },
  orderItems: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      qty: Number,
    },
  ],
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "processing", "paid"],
    },

    amountPaid: {
      type: Number,
      required: true,
    },
  },
  orderStatus: {
    type: String,
    default: "processing",
    enum: ["processing", "delivered"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const orderModel = mongoose.model("order", orderSchema);
