"use client";
import { ConfirmModal } from "@/components/modals/confirm-model";
import { Button } from "@/components/ui/button"
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ChapterActionsProps{
   disabled : boolean,
   chapterId : string,
   courseId : string,
   isPublished : boolean
}

   

export const ChapterActions = ({disabled,chapterId,courseId,isPublished}:ChapterActionsProps)=>{
    const [isLoading , setIsLoading] = useState(false);
    const router = useRouter();

    const onDelete = async()=>{
        try{
            setIsLoading(true);
            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)
            toast.success("Chapter deleted successfully");
            router.refresh();
            router.push(`/teacher/courses/${courseId}`)
        }catch{
        toast.error("Something went wrong");
        }finally{
            setIsLoading(false)
        }
    }
    return(
        <div className="flex items-center gap-x-2">
            <Button
            onClick={()=>{}}
            disabled={disabled || isLoading}
            variant={`outline`}
            size={`sm`}>
                {isPublished ? "UnPublish" : "Publish"}
            </Button>
            <ConfirmModal
            onConfirm={onDelete}
            >
            <Button size={`sm`} className="bg-black text-white" disabled={isLoading}>
            <Trash className="h-4 w-4"/>
            </Button>
            </ConfirmModal>
        </div>
    )
}