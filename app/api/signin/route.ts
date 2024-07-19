import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import prisma from "@/lib/prisma";

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
        return NextResponse.json({
            auth:true
        })
    }
    return NextResponse.json({
        auth:res
    })
}