import { Card, CardHeader, CardTitle ,CardContent} from "@/components/ui/card"
import { formatPrice } from "@/lib/format"


interface DataCardProps{
    value : number,
    shouldFormat ?: boolean,
    label : string
}


export const DataCard = ({value,shouldFormat,label} : DataCardProps)=>{
    return(
        <Card >
        <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-0">
            <CardTitle className="text-sm font-medium">
                {label}
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="font-bold text-2xl">
           {shouldFormat ? formatPrice(value) :  value }
            </div>
        </CardContent>
        </Card>
    )
} 