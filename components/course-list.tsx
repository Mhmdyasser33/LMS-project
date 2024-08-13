import { Category, Course } from "@prisma/client";
import { CourseCard } from "./course-card";

  type CoursesWithProgressWithCategory = Course & {
        category : Category | null , 
        chapters : {id : string}[] ,
        progress : number | null,
    } 

    type CourseListProps = {
        items : CoursesWithProgressWithCategory[]
    }

export const CoursesList = ({items} : CourseListProps) => {

    return ( 
        <div>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                {items.map((item)=>(
                 <CourseCard
                 key={item.id}
                 id={item.id}
                 title={item.title}
                 imageUrl={item.imageUrl!} /*  (!)-> non null assertion operator it is used to tell the compiler of typescript the value or property will not be null or undefined */
                 chapterLength={item.chapters.length}
                 price={item.price!}
                 progress={item.progress}
                 category={item?.category?.name!}

                 />
                ))}
            </div>
           {items.length === 0  && (
            <div className="text-xl text-slate-400 mt-10 text-center">
                No courses found
            </div>

           ) }
        </div>
     );
}
