import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";

const SearchPage = async() => {
     // ! get categories from database 
    const categories = await db.category.findMany({
        orderBy : {
            name : "asc",
        }
    })

    return ( 
        <>
        <div className="pt-6 px-6 md:hidden md:mb-0 block">
            <SearchInput/>
        </div>
        <div className="p-6">
           <Categories
           items={categories}/>
        </div>
        </>
    ); 
}
 
export default SearchPage;