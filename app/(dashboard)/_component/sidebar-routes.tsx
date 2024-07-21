"use client"

import { BarChart, Compass, Layout, List } from "lucide-react"
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const clientRoutes = [
    {
        icon : Layout,
        label : "Dashboard" ,
        href : "/"
    },
    {
        icon : Compass,
        label : "Browse" ,
        href : "/search"
    },
    
]

const teacherRoutes = [
    {
        icon : List,
        label : "Courses" ,
        href : "/teacher/courses"
    },
    {
        icon : BarChart,
        label : "Analytics" ,
        href : "/teacher/analytics"
    },
    
]
export const SidebarRoutes = ()=>{

    const pathname = usePathname();
   /*  console.log(pathname); */
    const isTeacherPage = pathname?.includes("/teacher") ; 

    const routes = isTeacherPage ? teacherRoutes : clientRoutes ; 
    return(
        <div className="flex flex-col w-full">
            {routes.map((route)=>(
                <SidebarItem
                key = {route.href}
                icon = {route.icon}
                label = {route.label}
                href = {route.href}
                />
            ))}
        </div>
    )
}