export type TOrder = {
    _id: string;
    orderId?: string;
    orderStatus: string;
    createdAt: Date|string;
    ownerName: string;
  };