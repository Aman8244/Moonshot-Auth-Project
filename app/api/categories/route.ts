import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const jwt = require("jsonwebtoken")

export async function GET(req: NextRequest) {
    const page = req.nextUrl.searchParams.get("page");
    const pageNo = page ? parseInt(page) : 1
    const itemsPerPage = 6;
    const skipItems = (pageNo - 1) * itemsPerPage;
    const categories = await prisma.category.findMany({
        skip: skipItems,
        take: itemsPerPage,
        include:{
            users:true
        }
    })
    return NextResponse.json({
        categories
    });

}

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log(body)
    const categoriesArray = [];
    for (let i = 0; i < 100; i++) {
        let temp = body.categories[i];
        categoriesArray.push({
            title: temp
        })
    }
    await prisma.category.createMany({
        data: categoriesArray
    })
    return NextResponse.json({
        message: "ok"
    });

}

export async function PUT(req: NextRequest) {
    const token = req.headers.get("Authorization")!.split(' ')[1];

    console.log(token)
    if (!token) {
        return NextResponse.json({
            message:"UnAuthorised"
        })
    }


    try {
        const secret = process.env.Secret_Key;
        const decoded = await jwt.verify(token, secret);
        const { id } = await req.json();
        await prisma.user.update({
            where: { id: decoded.id },
            data: {
                categories: {
                    connect: { id: parseInt(id) }
                }
            }
        });
    } catch (error) {
        console.error('JWT verification failed:', error);
        throw new Error('Unauthorized');
    }

    return NextResponse.json({
        message: "ok"
    })
}


export async function DELETE(req: NextRequest) {
    const query = req.nextUrl.searchParams;
    const id = parseInt(query.get("id")!)
    const token = req.headers.get("Authorization")!.split(' ')[1];

    if (!token) {
        return NextResponse.json({
            message:"UnAuthorised"
        })
    }
    const secret = process.env.Secret_Key;
    const decoded = await jwt.verify(token, secret);
    await prisma.user.update({
        where: { id: decoded.id },
        data: {
            categories: {
                disconnect: { id: id }
            }
        }
    });
    return NextResponse.json({
        message:"ok"
    })
}