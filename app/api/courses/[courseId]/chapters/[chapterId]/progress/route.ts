import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(req :Request,
    {params} : {params : {courseId : string, chapterId : string}}
){
    try{
        const { userId } = auth();
        if(!userId){
            return new NextResponse("Unauthorized" , {status : 400}) ; 
        }
        const { isCompleted } = await req.json(); 
        const userProgress = await db.userProgress.upsert({
            where : {
                userId_chapterId : {
                    userId ,
                    chapterId : params.chapterId,
                }
            },
            update : {
                // ! the value will be updated...
                    isCompleted
            },
            create:{
                userId,
                chapterId : params.chapterId,
                isCompleted
            }
        })

        return NextResponse.json(userProgress) ; 

    }catch(error){
        console.log("[PROGRESS_ERROR]",error);
        return new NextResponse("Internal error" , {status : 500}) ; 
    }
}