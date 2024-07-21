import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./sidebar";

export const MobileSidebar = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition-opacity duration-300 ease-in-out">
          <Menu />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-0 bg-white transition-transform duration-300 ease-in-out"
        >
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
};
