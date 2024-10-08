"use client" ;

import { Card } from "@/components/ui/card";
import { ResponsiveContainer , Bar,BarChart,XAxis,YAxis } from "recharts";

interface ChartProps{
    data : {
        name : string,
        total : number
    }[]
}


export const Chart = ({data} : ChartProps)=>{
    return(
        <Card>
         <ResponsiveContainer width="100%" height={350}>
  <BarChart data={data}>
    <XAxis
      dataKey="name"
      stroke="#000000"
      fontSize={15}
      tickLine={true}
      axisLine={false}
    />
    <YAxis
      stroke="#000000"
      fontSize={12}
      tickLine={false}
      axisLine={false}
      tickFormatter={(value) => `$${value}`}
    />
    <Bar
    dataKey={`total`}
    fill="#0369a1"
    radius={[4,4,0,0]}/>
  </BarChart>
</ResponsiveContainer>
        </Card>
    )
}