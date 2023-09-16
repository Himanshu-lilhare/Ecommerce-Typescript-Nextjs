import { StatDocument } from "../types/stats";
import { rootApi } from "./rootApi";


const statsApi = rootApi.injectEndpoints({
   endpoints:builder=>({
    getStats : builder.query<StatDocument,void>({
        query:()=>'/getStats'
    })
   })
})

export const {useGetStatsQuery} = statsApi