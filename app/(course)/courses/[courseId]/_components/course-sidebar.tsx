

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { Chapter, Course, UserProgress } from "@prisma/client"
import { redirect, usePathname, useRouter } from "next/navigation"
import { CourseSidebarItem } from "./course-sidebar-item"
import { CourseProgress } from "@/components/course.progress"

interface CourseSidebarProps{
   course : Course & {
    chapters : (Chapter &{
        userProgress : UserProgress[] | null
    })[]
   }
   progressCount : number
}

 
export const CourseSidebar = async ({course , progressCount} :CourseSidebarProps)=>{
    const { userId } = auth() ; 
    if(!userId){
        return redirect("/sign-in")
    }

   const purchase = await db.purchase.findUnique({
    where : {
        userId_courseId :{
          userId,
          courseId : course.id
        }
    }
   })
    return(
    <div className="h-full flex flex-col overflow-y-auto shadow-sm border-r">
       <div className="flex flex-col border-b p-8">
        <h1 className="font-semibold hover:text-sky-700 transition">
        {course.title}
        </h1>
         {purchase && (
            <div className="mt-10">
              <CourseProgress
               variant={`success`}
                value={progressCount}/>
            </div>
         )}
       </div>
       <div className="flex flex-col w-full">
        {course.chapters.map((chapter)=>(
            <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
            isCompleted={Boolean(!!chapter.userProgress?.[0]?.isCompleted)} // it also equal ===  !! to convert value to boolean {!!chapter.userProgress?.[0]?isCompleted}
            />
        ))}
       </div>
    </div>
   )
}