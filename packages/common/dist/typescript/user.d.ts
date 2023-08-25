import mongoose, { Document } from "mongoose";
import { Cart, CartItems } from "./cart";
export interface UserDocument extends Document {
    _id: string | mongoose.ObjectId;
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    address?: Address[];
    cart?: Cart[] | CartItems[];
    forgotPasswordToken?: string;
    forgotPasswordExpiry?: Date;
    verifyToken?: string;
    verifyTokenExpiry?: Date;
}
interface Address {
    street: string;
    city: string;
    state: string;
    phone: string;
    zipcode: string;
    country: string;
    createdAt: Date;
}
export {};
//# sourceMappingURL=user.d.ts.map