import { NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json(({
        id : 1,
        name : "mohamed",
        body : "this is first hour in LMS" 
    }))
}