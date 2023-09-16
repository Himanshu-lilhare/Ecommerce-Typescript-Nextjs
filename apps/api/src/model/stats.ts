import { ProductType } from "common";
import mongoose from "mongoose";
import { Document, Schema } from "mongoose";

interface UserStat {
  totalUsers: number;
  increaseInUsers: string;
}
interface OrderStat {
  totalOrders: number;
  increaseInOrders: string;
}

export interface ITop3Products {
  product: Schema.Types.ObjectId 
  totalSold: string;
}
export interface StatDocument extends Document {
  top3Products: ITop3Products[];
  userStats: UserStat;
  orderStats: OrderStat;
  createdAt: Date;
  updatedAt: Date;
}

const statSchema = new mongoose.Schema<StatDocument>(
  {
    top3Products: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "product",
        },
        totalSold: Number,
      },
    ],
    userStats: {
      totalUsers: Number,
      increaseInUsers: String,
    },
    orderStats: {
      totalOrders: Number,
      increaseInOrders: String,
    },
  },
  { timestamps: true }
);

export const statsModel = mongoose.model("stats", statSchema);
