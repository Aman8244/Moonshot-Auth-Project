import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { UserData } from "@/components/AuthForm";
import bcryptjs from "bcryptjs";


export async function POST(req:NextRequest){
    const data:UserData = await req.json();
    console.log(data);
    const salt = parseInt(process.env.Salt_Round!);

    try {
        await bcryptjs.hash(data.password,salt,async(err:Error|null,hash:string)=>{
            if(err){
                return NextResponse.json({
                    message:"Failed Internal Error"
                })
            }
            await prisma.user.create({
                data:{
                   name:data.name,
                   email:data.email,
                   password:hash
                }
           }).then(res=>{
                console.log(res)
                return NextResponse.json({
                    message:"success"
                })
           })
        })
        
    } catch (error) {
        console.log("Error Occured :",error)
        
    }
    return NextResponse.json({
        message:"Failed Internal Error"
    })
    
}