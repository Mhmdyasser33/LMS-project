import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/course-list";
import { auth } from "@clerk/nextjs/server"
import { CheckCircle, Clock } from "lucide-react";
import { redirect } from "next/navigation";
import { InfoCard } from "./_components/info-card";
import { Metadata } from "next";





export default async function Dashboard() {

    const { userId } = auth();
    if(!userId){
      return redirect("/sign-in")
    }

    const {
      completedCourses,
      coursesInProgress
    } = await getDashboardCourses(userId) ; 
    return (
      <div className="space-y-4 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoCard
             icon={Clock}
             label={`In progress`}
             numberOfItems={coursesInProgress.length}/>
              <InfoCard
             icon={CheckCircle}
             label={`Completed`}
             numberOfItems={completedCourses.length}
             variant="success"/>
        </div>
        <CoursesList
        items={[...coursesInProgress , ...completedCourses]}/>
      </div>
    )
  }
