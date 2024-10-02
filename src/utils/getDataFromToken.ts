import Jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDataFromToken = (req: NextRequest) => {
    try{
        const token = req.cookies.get("token")?.value || "";
        const decodeToken:any = Jwt.verify(token, process.env.AUTH_SECRET!)
        return decodeToken.id;
    }
    catch(error: any){
        console.log(error);
        throw new Error(error.message);
    }
}