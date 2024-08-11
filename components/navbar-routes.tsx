"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import {LogOut } from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button"
import { SearchInput } from "./search-input";

export const NavbarRoutes = ()=>{
    const pathname = usePathname();
    const router = useRouter() ; 

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isPlayerPage = pathname?.includes("/chapter") ; 
    const isSearchPage = pathname === "/search"
    return(
      <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput/>
        </div>
      )}
        <div className="flex gap-x-2 ml-auto">
             {isTeacherPage || isPlayerPage ?(
                <Link href={`/`}>
                <Button size={"sm"} className="mt-1.5 hover:bg-slate-100">
                    <LogOut className="mr-2 w-4 h-4"/>
                    Exit
                </Button>
                </Link>
             ) : (
                <Link href="/teacher/courses" className=" mt-1.5 hover:bg-slate-100 rounded transition">
                  <Button size={"sm"}>
                    Teacher mode
                  </Button>
                </Link>
             )}
            <UserButton afterSignOutUrl="/"/>
        </div>
        </>
    )
}