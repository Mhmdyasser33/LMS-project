import { NavbarRoutes } from "@/components/navbar-routes"
import { MobileSidebar } from "./mobile-sibdebar"

export const Navbar = ()=>{
    return (
        <div className="p-4 h-full flex item-center bg-white shadow-sm">
        <MobileSidebar/> 
        <NavbarRoutes/>
        </div>
    )
}