"use client"

import { LucideIcon } from "lucide-react"

interface SideBarItem{
    icon : LucideIcon,
    label : string , 
    href : string
}
export const SidebarItem = ({icon,label,href} : SideBarItem)=>{
    return(
        <div>
            Sidebar Item here...!
        </div>
    )
}