import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { Menu } from "lucide-react";
import { CourseSidebar } from "./course-sidebar";

interface CourseMobileSidebarProps{
    course : Course & {
        chapters : (Chapter & {
            userProgress : UserProgress[] | null
        })[]
    }
    progressCount : number
}

const CourseMobileSidebar = ({course,progressCount}:CourseMobileSidebarProps) => {
    return ( 
      <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition-all">
            <Menu/>
        </SheetTrigger>
        <SheetContent side={`left`} className="bg-white p-0 w-72">
            <CourseSidebar
            course={course}
            progressCount={progressCount}/>
        </SheetContent>
      </Sheet>
     );
}
 
export default CourseMobileSidebar;