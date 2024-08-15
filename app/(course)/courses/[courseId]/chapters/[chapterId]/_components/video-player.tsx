"use client" ;
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import { Loader2, Lock } from "lucide-react";
import { useState } from "react";

 

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
    const [isReady , setIsReady] = useState(false) ; 
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
                onEnded={()=>{}}
                autoPlay
                playbackId={playBackId}
                />
            )}
        </div>
    )
}