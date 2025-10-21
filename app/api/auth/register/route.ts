import { PrismaClient } from "@/generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
}).$extends(withAccelerate())

export async function POST(request: NextRequest){
    const { email, password } = await request.json()

    const hashedPassword = await hash(password, 10)
    
    try {
        await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        })    
        return NextResponse.json(
            { message: "Successfully saved new user."}, 
            { status: 201 }
        )
    } catch (error: any) {
        // Prisma unique constraint error code
        if (error.code === "P2002"){
            return NextResponse.json(
                { message: "Email already in use." },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: "Something went wrong." },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect()
    }
}