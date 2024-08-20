import { getAnalytics } from "@/actions/get-analytics";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Analytics page",
    description: "Gain insights into your learning progress and course performance with detailed analytics. Track revenue, sales, and student engagement in real-time."
}

const AnalyticsPage =async () => {

    const { userId } = auth() ;
    if(!userId){
        return redirect("/sign-in") ; 
    } 

    const {
        data,
        totalRevenue,
        totalSales
    } = await getAnalytics(userId) ;

    return ( 
        <div className="p-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
               <DataCard
               value={totalRevenue}
               label={`Total revenue`}
               shouldFormat={true}/>
               <DataCard
               value={totalSales}
               label={`Total sales`}/>
           </div>
           <Chart
             data={data}/>   
        </div>
     );
}
 
export default AnalyticsPage;