"use client";

import * as z from "zod";
import axios from "axios";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";
import MuxPlayer from "@mux/mux-player-react";

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const schema = z.object({
  videoUrl: z.string().min(1),
});

export function ChapterVideoForm({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) {
  const [mounted , setMounted] = useState(false) ; 
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();
  
  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("Chapter updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };
   
  useEffect(()=>{
    setMounted(true);
  },[])
  if(!mounted){
    return null; 
  }


  return (
    <div className="mt-6 border bg-slate-100 rounded p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter video
        <Button onClick={toggleEdit} className="hover:bg-slate-200">
          {isEditing ? (
            <>Cancel</>
          ) : (
            !initialData.videoUrl ? (
              <>
                <PlusCircle className="w-4 h-4 mr-2" />
                Add a video
              </>
            ) : (
              <>
                <Pencil className="w-4 h-4 mr-2" />
                Edit video
              </>
            )
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
              <div className="relative w-full h-0 pt-[56.25%] mt-2">
          <MuxPlayer
              playbackId={initialData?.muxData?.playbackId || ""}
              className="absolute top-0 left-0 w-full h-full"
             />
            </div>
        )
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="mt-3">
            Upload this chapter&apos;s video
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Video can take a few minutes to process. Refresh the page if the video does not appear.
        </div>
      )}
    </div>
  );
}
