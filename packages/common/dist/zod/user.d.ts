import { z } from "zod";
export declare const registerUserBody: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export type RegisterUserType = z.infer<typeof registerUserBody>;
export declare const addToCartBody: z.ZodObject<{
    productId: z.ZodString;
    qty: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    productId: string;
    qty: number;
}, {
    productId: string;
    qty: number;
}>;
export type AddToCartFront = z.infer<typeof addToCartBody>;
export declare const deleteFromCartBody: z.ZodObject<{
    productId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    productId: string;
}, {
    productId: string;
}>;
export type DeleteFromCart = z.infer<typeof addToCartBody>;
//# sourceMappingURL=user.d.ts.map