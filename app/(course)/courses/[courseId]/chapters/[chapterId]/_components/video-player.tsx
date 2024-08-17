"use client" ;
import { useConfettiStore } from "@/hooks/use-confetti-hook";
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

 

interface VideoPlayerProps{
    chapterId : string,
    title : string,
    courseId : string,
    nextChapterId ?: string,
    playBackId : string,
    isLocked : boolean,
    completeChapterFromBeginToEnd : boolean
}

export const VideoPlayer = ({chapterId,title,courseId,nextChapterId,playBackId,isLocked,completeChapterFromBeginToEnd} : VideoPlayerProps)=>{
    const [isLoading,setIsLoading] = useState(false);
    const [isReady , setIsReady] = useState(false) ; 
    const router = useRouter();
    const confetti = useConfettiStore();

    const onEnd = async()=>{
       try{
        setIsLoading(true) ; 
        if(completeChapterFromBeginToEnd){
            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`,{
                isCompleted : true,
            });
            if(!nextChapterId){
                   confetti.onOpen();
            }
            toast.success("Progress updated");
            router.refresh(); 
            if(nextChapterId){
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
            }
        }

       }catch{
        toast.error("Something went wrong") ; 
       }finally{
        setIsLoading(false) ;
       }
    }
    return(
        <div className="relative aspect-video">
            {!isReady && !isLocked && (
                <div className=" absolute bg-slate-800 flex items-center inset-0 justify-center">
                    <Loader2 className="w-8 h-8  animate-spin text-secondary"/>
                </div>
            )}
            {isLocked && (
                <div className="absolute bg-slate-800 flex flex-col gap-y-2 items-center inset-0 justify-center">
                   <Lock className="h-8 w-8"/>
                   <p className="text-lg text-white">This chapter is locked </p>
                </div>
            )}

            {!isLocked && (
                <MuxPlayer
                className={cn(!isReady && "hidden")}
                title={title}
                onCanPlay={()=> setIsReady(true)}
                onEnded={onEnd}
                autoPlay
                playbackId={playBackId}
                />
            )}
        </div>
    )
}