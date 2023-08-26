import mongoose, { Document } from "mongoose";
import { UserDocument } from "./user";

export interface IOrder{
    orderId?: string; // Note: You have orderId as optional in the schema
    userId: string | mongoose.Types.ObjectId | UserDocument;
    address: {
      street?: string; // Note: You have address fields as optional in the schema
      city?: string;
      state?: string;
      phone?: string;
      zipcode?: string;
      country?: string;
    };
    orderItems: {
      _id: string | mongoose.Types.ObjectId ;
      qty: number;
    }[];
    paymentInfo: {
      id: string;
      status: 'pending' | 'processing' | 'paid';
      amountPaid: number;
    };
    orderStatus: 'processing' | 'delivered';
    createdAt: Date;
  }

 