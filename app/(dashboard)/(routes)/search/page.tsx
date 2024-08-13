import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-course";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CoursesList } from "@/components/course-list";


interface SearchPageProps {
    searchParams : {
        title : string ;
        categoryId : string;
    }
}

const SearchPage = async({searchParams} : SearchPageProps) => {
    const {userId} = auth();
    if(!userId){
        return redirect("/")
    }
     // ! get categories from database 
    const categories = await db.category.findMany({
        orderBy : {
            name : "asc",
        }
    })
    const courses = await getCourses({userId , ...searchParams}) ; 

    return ( 
        <>
        <div className="pt-6 px-6 md:hidden md:mb-0 block">
            <SearchInput/>
        </div>
        <div className="p-6">
           <Categories
           items={categories}/>

           <CoursesList items={courses} />
        </div>
        </>
    ); 
}
 
export default SearchPage;