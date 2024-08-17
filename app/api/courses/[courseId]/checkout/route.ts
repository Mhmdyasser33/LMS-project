import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { url } from "inspector";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req : Request , {params} : {params : {courseId : string}}){

    try{
        const LoggedUser = await currentUser();
        if(!LoggedUser || !LoggedUser.id || !LoggedUser.emailAddresses?.[0]?.emailAddress){
            return new NextResponse("Unauthorized" , {status : 401}) ;
        }

        const course = await db.course.findUnique({
            where : {
                id : params.courseId,
                isPublished : true,
            }
        })

        const purchase = await db.purchase.findUnique({
            where : {
                userId_courseId : {
                    userId : LoggedUser.id,
                    courseId : params.courseId
                }
            }
        })
         
        if(purchase){
            return new NextResponse("Already purchased" , {status : 400}) ;
        }
        if(!course){
            return new NextResponse("Course Not found" , {status : 404}) ;

        }

        const line_items:Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                quantity : 1 , 
                price_data : {
                    currency : "USD" , 
                product_data : {
                    name : course.title,
                    description : course.description!
                },
                unit_amount : Math.round(course.price! * 100) 
                }
            }
        ]
        let stripeCustomer = await db.stripeCustomer.findUnique({
            where : {
                userId : LoggedUser.id,
            },
            select : {
                stripeCustomerId : true
            }
        })

        if(!stripeCustomer){
            const newStripeCustomer = await stripe.customers.create({
                email : LoggedUser.emailAddresses[0].emailAddress,
            });
            stripeCustomer = await db.stripeCustomer.create({
                data : {
                    userId : LoggedUser.id,
                    stripeCustomerId : newStripeCustomer.id
                }
            })
        }

        const session = await stripe.checkout.sessions.create({
            customer : stripeCustomer.stripeCustomerId,
            line_items,
            mode : "payment",
            success_url : `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}/?success=1`,
            cancel_url : `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}/?canceled=1`,
            metadata : {
                courseId : course.id,
                userId : LoggedUser.id
            }
        })

        return NextResponse.json({url : session.url})
       
        

    }catch(error){
        console.log("[COURSE_ID_CHECKOUT]");
        return new NextResponse("Internal error" , {status : 500}) ;
    }

}