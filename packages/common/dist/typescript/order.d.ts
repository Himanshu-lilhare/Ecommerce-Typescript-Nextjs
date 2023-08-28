import mongoose from "mongoose";
import { UserDocument } from "./user";
export interface IOrder {
    _id: string | mongoose.ObjectId;
    orderId?: string;
    userId: string | mongoose.Types.ObjectId | UserDocument;
    address: {
        street?: string;
        city?: string;
        state?: string;
        phone?: string;
        zipcode?: string;
        country?: string;
    };
    orderItems: {
        _id: string | mongoose.Types.ObjectId;
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
//# sourceMappingURL=order.d.ts.map