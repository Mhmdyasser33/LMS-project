import Sidebar from "./_component/sidebar";

const DashboardLayout = ({children} :{
    children : React.ReactNode
}) => {
    return (
        <div className="h-full">
            <div className="hidden md:flex w-56 flex-col fixed h-full inset-y-0 z-50">
          <Sidebar/>
            </div>
           {children}
        </div>
      );
}
 
export default DashboardLayout;