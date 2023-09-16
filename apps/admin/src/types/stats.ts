import { ProductType } from "./product";

export interface UserStat {
  totalUsers: number;
  increaseInUsers: string;
}
export interface OrderStat {
  totalOrders: number;
  increaseInOrders: string;
}

export interface ITop3Products {
  product: ProductType;
  totalSold: string;
}
export interface StatDocument{
  top3Products: ITop3Products[];
  userStats: UserStat;
  orderStats: OrderStat;
}
