"use client";

import * as z from "zod";
import axios from "axios";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { File,Loader2, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";


interface AttachmentFormProps {
  initialData: Course & {attachments : Attachment[]}
  courseId: string;
}

const schema = z.object({
 url : z.string().min(1) , 
});

export function AttachmentForm({ initialData, courseId }: AttachmentFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const[deleteId , setIsDeleteId] = useState<string | null>(null)
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();
 
  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went error");
    }
  };

  const onDelete = async(id : string)=>{
    try{
        await axios.delete(`/api/courses/${courseId}/attachments/${id}`)
        toast.success("Attachment deleted successfully") ;
        router.refresh() ; 
    }catch{
     toast.error("Something went error") ; 
    }finally{
      setIsDeleteId(null) ;
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded p-4">
      <div className="font-medium flex items-center justify-between">
        Course attachments
        <Button onClick={toggleEdit} className="hover:bg-slate-200">
          {isEditing &&  (
            <>Cancel</>
          ) }
           {!isEditing &&(
            <>
            <PlusCircle className="w-4 h-4 mr-2"/>
             Add a file
            </>
            
           )}
      
        </Button>
      </div>
      {!isEditing && (
         <>
         {initialData.attachments.length === 0  &&  (
          <p className="text-sm text-slate-500 italic">
            No attachments yet
          </p>
         )}
          {initialData.attachments.length > 0 &&(
            <div className="space-y-2">
              {initialData.attachments.map((attachment)=>(
                <div 
                key={attachment.id}
                className="flex items-center w-full p-3 bg-sky-100 border-sky-200 border text-sky-700 rounded-md">
                 <File className="w-4 h-4 mr-2 flex-shrink-0"/>
                 <p  className="text-xs line-clamp-1">
                  {attachment.name}
                 </p>
                 {deleteId === attachment.id &&(
                  <div>
                    <Loader2 className="h-4 w-4 animate-span"/>
                  </div>
                 )}
                 {deleteId !== attachment.id &&(
                  <button 
                  onClick={()=> onDelete(attachment.id)}

                  className="ml-auto hover:opacity-75 transition">
                    <X className="h-4 w-4"/>
                  </button>
                 )}
                </div>
              ))}
            </div>
           )}
         </>
      )}
      {isEditing && (
       <div>
        <FileUpload
        endpoint="courseAttachment"
        onChange={(url)=>{
          if(url){
            onSubmit({url : url})
          }
        }}
        />
        <div className="text-xs text-muted-foreground mt-4">
          Add anything your student need to complete the course 
        </div>
       </div>
      )}
    </div>
  );
}
