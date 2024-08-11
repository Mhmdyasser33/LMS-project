"use client" ;
import { Category } from "@prisma/client";
import { IconType } from "react-icons";
import {
    FcEngineering,
    FcFilmReel,
    FcMultipleDevices,
    FcOldTimeCamera,
    FcSalesPerformance,
    FcSportsMode,
    FcMindMap,
    

}from "react-icons/fc"
import { CategoryItem } from "./category-item";
 

interface CategoriesProps{
    items : Category[]
}
// ! create iconMap variable of type Record<Category["name"] , IconType>
const iconMap : Record<Category["name"] , IconType> ={
    "Engineering" : FcEngineering,
    "Filming" : FcFilmReel,
    "Computer science" : FcMultipleDevices,
    "Photography" : FcOldTimeCamera,
    "Accounting" : FcSalesPerformance,
    "Fitness" : FcSportsMode,
    "AI" : FcMindMap,
}

export const Categories = ({items} : CategoriesProps)=>{
    return (
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
            {items.map((item)=>(
                <CategoryItem
                 key={item.id}
                 label={item.name}
                 icon={iconMap[item.name]}
                 value={item.id}
                />
            ))}
        </div>
    )
}