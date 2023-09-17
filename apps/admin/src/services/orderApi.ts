import { TOrder } from "../types/order";
import { rootApi } from "./rootApi";


const orderApi = rootApi.injectEndpoints({
    endpoints:builder=>({
        getOrders:builder.query<TOrder[],void>({
            query:()=>"getAllOrders"
        })
    })
})

export const {useGetOrdersQuery} = orderApi