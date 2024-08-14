import { NavbarRoutes } from "@/components/navbar-routes";
import { Chapter, Course, UserProgress } from "@prisma/client";
import CourseMobileSidebar from "./course-mobile-sidevar";

interface CourseNavbarProps {
    course : Course & {
        chapters : (Chapter & {
            userProgress : UserProgress[] | null
        })[]
    }
    progressCount : number
}

const CourseNavbar = ({course , progressCount} : CourseNavbarProps) => {
    return ( 
        <div className="flex items-center h-full bg-whites shadow-sm border-b p-4">
            <CourseMobileSidebar
            course={course}
            progressCount={progressCount}/>
           <NavbarRoutes/>
        </div>
     );
}
 
export default CourseNavbar;