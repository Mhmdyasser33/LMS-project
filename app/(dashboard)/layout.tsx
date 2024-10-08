import { Metadata } from "next";
import { Navbar } from "./_component/navbar";
import Sidebar from "./_component/sidebar";


const DashboardLayout = ({children} :{
    children : React.ReactNode
}) => {
    return (
        <div className="h-full">
         <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
          <Navbar/>
         </div>
            <div className="hidden md:flex w-56 flex-col fixed h-full inset-y-0 z-50">
          <Sidebar/>
            </div>
            <main className="md:pl-56 pt-[80px] h-full">
           {children}
            </main>
        </div>
      );
}
 
export default DashboardLayout;