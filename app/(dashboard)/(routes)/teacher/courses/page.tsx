import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Courses page",
    description: "Browse through our extensive collection of courses. Enhance your skills with top-quality learning content designed for all levels."
}

const CoursesPage =async () => {
     
    const {userId} = auth() ; 

    if(!userId){
        return redirect("/sign-in")
    }

    const courses = await db.course.findMany({
        where : {
            userId,
        },
        orderBy : {
            createdAt : "desc",
        },
    })
    return (  

      <div className="container mx-auto py-10">
      <DataTable columns={columns} data={courses} />
    </div>
        
    );
}
 
export default CoursesPage;