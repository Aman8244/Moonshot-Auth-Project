import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import prisma from "@/lib/prisma";
import generateToken from "@/utils/generateToken";

export async function POST(req:NextRequest) {
    const {email,password} = await req.json();
    const response = await prisma.user.findFirst({
        where:{
            email:email
        }
    })
    let res:boolean = false
    const result = await bcryptjs.compare(password,response?.password)
    if(result===true){
        const token = await generateToken({email:email})
        console.log(token)
        return NextResponse.json({
            auth:true,
            token
        })
    }
    return NextResponse.json({
        auth:res
    })
}