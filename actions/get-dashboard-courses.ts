import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";
import { getProgress } from "@/actions/get-actions";

type CourseWithProgressWithCategory = Course & {
    category : Category ,
    chapters : Chapter[] , 
    progress : number | null
}

type DashboardCourses = {
    completedCourses : CourseWithProgressWithCategory[],
    coursesInProgress : CourseWithProgressWithCategory[]
}


export const getDashboardCourses = async(userId : string): Promise<DashboardCourses> =>{
   try{
    const purchasedCourses = await db.purchase.findMany({
        where : {
             userId,
        },
        select : {
            course : {
                include : {
                    category : true,
                    chapters : {
                        where :{
                            isPublished : true
                        }
                    }
                }
            }
        }
    })

    const courses = purchasedCourses.map((purchase)=> purchase.course) as CourseWithProgressWithCategory[]
     
    for(let course of courses){
        const progress = await getProgress(userId , course.id) ; 
        course.progress = progress ; // ! === course['progress'] = progress 
    }
     const completedCourses = courses.filter((course) => course.progress === 100) ; 
        // ! < 100 this mean that course not completed and ?? 0 which mean that if course be null of undefined value of it will be 0 
        const coursesInProgress = courses.filter((course) => (course.progress ?? 0) < 100 ); 

        return{
            completedCourses,
            coursesInProgress
        }
   }catch(error){
    console.log("GET_DASHBOARD_COURSES" , error);
     return {
        completedCourses : [],
        coursesInProgress : []
     }
   }
}