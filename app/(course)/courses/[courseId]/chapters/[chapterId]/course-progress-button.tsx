"use client";

import { Button } from "@/components/ui/button"
import { useConfettiStore } from "@/hooks/use-confetti-hook";
import { db } from "@/lib/db";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
interface CourseProgressButtonProps{
    chapterId : string,
    courseId : string,
    nextChapterId ?: string,
    isCompleted ?: boolean
}

export const CourseProgressButton = ({chapterId,courseId,nextChapterId,isCompleted}:CourseProgressButtonProps)=>{
    const[isLoading , setIsLoading] = useState(false) ; 
    const router = useRouter() ; 
    const confetti = useConfettiStore() ;  
    const Icon = isCompleted ? XCircle : CheckCircle

    const onClick = async()=>{
        try{
            setIsLoading(true) ;
            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`,{
                // ! ex: video not complete and we make complete so value and negative of it...
                isCompleted : !isCompleted
            })
            // ! this mean that we arrive to the last video 
           if(!isCompleted && !nextChapterId){
            confetti.onOpen();
           }
          // ! this mean that he finish video and want to go to the next... 
           if(!isCompleted && nextChapterId){
           router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
           }
           toast.success("Progress updated") ; 
           router.refresh();
        }catch{
            toast.error("Something went wrong") ; 
        }finally{
            setIsLoading(false) ; 
        }
    }

    return(
        <Button
         disabled={isLoading}
         onClick={onClick}
         type="button"
         variant={isCompleted ? "outline" : "success"}
         className="w-full md:w-auto bg-black text-white">
           {isCompleted ? "Not completed" : "Mark as complete"}
           <Icon className="w-4 h-4 ml-2"
           />
        </Button>
   )
}