"use client";

import * as z from "zod";
import axios from "axios";
import { FileUpload } from "@/components/file-upload";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


interface ImageFormProps {
  initialData: {
    imageUrl: string;
  };
  courseId: string;
}

const schema = z.object({
  imageUrl: z.string().min(1, {
    message: "imageUrl is required",
  }),
});

export function ImageForm({ initialData, courseId }: ImageFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();
 
  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went error");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded p-4">
      <div className="font-medium flex items-center justify-between">
        Course image
        <Button onClick={toggleEdit} className="hover:bg-slate-200">
          {isEditing &&  (
            <>Cancel</>
          ) }
           {!isEditing && !initialData.imageUrl &&(
            <>
            <PlusCircle className="w-4 h-4 mr-2"/>
            Add an image 
            </>
           )}
          { !isEditing && initialData.imageUrl && (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
      !initialData.imageUrl ?(
        <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
          <ImageIcon className="h-10 w-10 text-slate-500"/>
        </div>
      ) : (
        <div className="relative aspect-video mt-2">
          <Image
          alt="Upload"
          src={initialData.imageUrl}
          fill
          className="object-cover rounded-md"
          />
        </div>
      )
      )}
      {isEditing && (
       <div>
        <FileUpload
        endpoint="courseImage"
        onChange={(url)=>{
          if(url){
            onSubmit({imageUrl : url})
          }
        }}
        />
        <div>
          16:9 Aspect Ratio Recommended
        </div>
       </div>
      )}
    </div>
  );
}
