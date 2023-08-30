import { NextRequest} from "next/server";
import cors from "cors"
import next from "next/types";
import { toast } from "react-hot-toast";

export function middleware(req:NextRequest){

}

export const config={matcher:['/profile']}