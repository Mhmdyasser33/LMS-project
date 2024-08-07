"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios, { Axios } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const schema = z.object({
    title : z.string().min(1),
})


interface ChapterTitleFormProps{
    initialData : {
        title : string
    };
    courseId : string,
    chapterId : string ,
}

export function ChapterTitleForm({initialData , courseId , chapterId} : ChapterTitleFormProps){
    const [isEditing , setIsEditing] = useState(false);
    const toggleEdit = ()=> setIsEditing((current) => !current)
    const router = useRouter();
     const form = useForm<z.infer<typeof schema>>({
        resolver : zodResolver(schema),
        defaultValues : initialData
     })
        
     const {isSubmitting, isValid} = form.formState ;  
     const onSubmit = async (values : z.infer<typeof schema>)=> {
       try{
         await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}` , values)
         toast.success("Chapter updated") 
         //! responsible for switch from the edit mode after finish to view mode...
         toggleEdit()
         router.refresh();
          
       }catch{
         toast.error("Something went error")  
       }
     }
    return(
        <div className="mt-6 border bg-slate-100 rounded p-4">
            <div className="font-medium flex items-center justify-between">
             Chapter title
              <Button onClick={toggleEdit} className="hover:bg-slate-200">
                {isEditing ?(
                <>Cancel</>
              ) : 
               (
                        <>
                        <Pencil className="w-4 h-4 mr-2"/>
                        Edit title
                        </>   
                )}
              </Button>
              
              
            </div>
            {!isEditing && (
                <p className="text-sm mt-2">
                    {initialData.title}
                </p>
            )}
            {isEditing &&(
                <Form {...form}>
                    <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-4">
                    <FormField
                    control={form.control}
                    name="title"
                    render = {({field})=>(
                        <FormItem>
                            <FormControl>
                                <Input
                                disabled={isSubmitting}
                                placeholder="e.g. 'Introduction to the course'"
                                {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                   <div className="flex items-center gap-x-2">
                    <Button
                    className="bg-black text-white"
                     type="submit"
                    disabled={isSubmitting || !isValid }>
                        Save
                    </Button>
                   </div>
                    </form>
                </Form>
            )}
        </div>
    )
}