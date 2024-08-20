"use client";

import { cn } from "@/lib/utils";
import { usePathname ,useRouter, useSearchParams } from "next/navigation";
import qs from "query-string" ;
import { IconType } from "react-icons";


interface CategoryItemProps{
    label : string,
    icon ?: IconType,
    value ?: string

}
export const CategoryItem = ({label,icon : Icon,value} : CategoryItemProps)=>{

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentCategoryId = searchParams.get("categoryId") ; 
    const currentTitle = searchParams.get("title");
    const isSelected = currentCategoryId === value 
    
     const onClick = ()=>{
        const url = qs.stringifyUrl({
            url : pathname,
            query : {
                title : currentTitle,
                //! to handle part of if i select or click to the item once and also click to it again so if can twice value of Category will be null else value 
                categoryId :  isSelected ? null : value ,
            }
        },{
            skipEmptyString : true , 
            skipNull : true
        })

        router.push(url) ; 
     }
    return(
        <button onClick={onClick} type="button" className={cn("flex items-center py-2 px-3 text-sm border border-slate-200 rounded-full gap-x-1 hover:border-sky-700 transition",
            isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
        )}>
         {Icon && <Icon size={20}/>}
         <div className="truncate">{label}</div>
        </button>
    )
}