export interface Review {
    comment: string;
    createdAt: Date;
}
export type Images = {
    public_id: string;
    url: string;
};
export interface ProductType {
    _id?: string;
    name: string;
    description: string;
    price: number;
    images?: Images[];
    category: string;
    seller: string;
    stock: number;
    ratings?: number;
    reviews?: Review[];
}
//# sourceMappingURL=product.d.ts.map