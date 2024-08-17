"use client" ;
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

 

interface CourseEnrolledButtonProps{
    courseId : string,
    price : number
}

export const CourseEnrolledButton = ({courseId,price} : CourseEnrolledButtonProps)=>{
   const [isLoading , setIsLoading] = useState(false) ; 

   const onClick = async()=>{
    try{
        setIsLoading(true) ; 
        const response = await axios.post(`/api/courses/${courseId}/checkout`) ;
        window.location.assign(response.data.url)
    }catch{
       toast.error("Something went wrong") ;
    }finally{
        setIsLoading(false)
    }
   }
    return(
       <Button onClick={onClick} size={`sm`} className="bg-black text-white w-full md:w-auto" disabled={isLoading}>
        Enroll for {formatPrice(price)}
       </Button>
    )
}