"use client" ;
import qs from "query-string";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useSearchParams , useRouter } from "next/navigation";

 

export const SearchInput = ()=>{
     const [value , setValue] = useState("") ; 
     const debounceValue = useDebounce(value) ; 
     const pathname = usePathname();
     const router = useRouter();
     const searchParams = useSearchParams() ; 
     const currentCategoryID = searchParams.get("categoryId") ; 

     useEffect(()=>{
        const url = qs.stringifyUrl({
            url : pathname , 
            query : {
                categoryId : currentCategoryID,
                title : debounceValue,
            }
        },{
            skipEmptyString : true,
            skipNull : true,
        })

        router.push(url) ; 
     },[debounceValue , currentCategoryID , router , pathname]) ; 
   return(
    <div className="relative">
       <Search className="absolute w-4 h-4 top-3 left-3 text-slate-600 " />
       <Input value={value}
       onChange={(e)=>setValue(e.target.value)}
        placeholder="Search for a course..." 
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"/>
    </div>
   )
}