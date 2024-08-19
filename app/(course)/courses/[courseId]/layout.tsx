import { getProgress } from "@/actions/get-actions";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { CourseSidebar } from "./_components/course-sidebar";
import CourseNavbar from "./_components/course-navbar";

const CourseLayoutPage = async ({children , params} : {children : React.ReactNode,params : {courseId : string}}) => {
  const { userId } = auth() ; 
  if(!userId){
    return redirect("/sign-in")
  }
const course = await db.course.findUnique({
    where : {
        id : params.courseId
    },
    include : {
        chapters : {
            where : {
                isPublished : true
            },
            include : {
                userProgress : {
                      where : {
                        userId
                      }
                }
            },
            orderBy : {
                position : "asc"
            }
        },
        
    }
})

    if(!course){
        return redirect("/") ; 
    }

    const progressCount = await getProgress(userId , course.id) ; 
    return ( 
        <div className="h-full">
            <div className="h-[80px] md:pl-80 fixed w-full inset-y-0 z-50">
             <CourseNavbar
              course={course}
              progressCount={progressCount}/>
            </div>
            <div className="h-full hidden md:flex w-80 flex-col fixed inset-y-0 z-50">
            <CourseSidebar
            course={course}
            progressCount={progressCount}
            />
            </div>
            <main className="md:pl-80 pt-[80px] h-full">
            {children}
            </main>
        </div>
     );
}
 
export default CourseLayoutPage;