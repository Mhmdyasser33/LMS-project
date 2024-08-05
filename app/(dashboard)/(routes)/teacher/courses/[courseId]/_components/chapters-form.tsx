"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Chapter, Course } from "@prisma/client";
import { ChaptersList } from "./chapter-list";

interface ChaptersFormProps {
  initialData: Course &  {chapters : Chapter[]}
  courseId: string;
}

const schema = z.object({
 title : z.string().min(1)
});

export function ChaptersForm({ initialData, courseId }: ChaptersFormProps) {
  const [isCreating , setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false);
  const toggleCreating = () =>{ setIsCreating((current) => !current)};
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title : "",
    },
  });
 
   const onReorder = async(updateData : {id : string , position : number}[])=>{
    try{
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/chapters/reorder`,{
        list : updateData
      })
      toast.success("Chapters reordered") ; 
      router.refresh() ;
    }catch{
      toast.error("Something went error") ;  
    }finally{
      setIsUpdating(false) ;  
    }

   }

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went error");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded p-4">
      <div className="font-medium flex items-center justify-between">
        Course chapters
        <Button onClick={toggleCreating} className="hover:bg-slate-200">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>
      {isCreating&& (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the course...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
                <Button
                  className="bg-black text-white"
                  type="submit"
                  disabled={isSubmitting || !isValid}
                >
                  Create
                </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div className={cn("text-sm mt-2",
          !initialData.chapters.length && "text-slate-500 italic"
        )}>

         {!initialData.chapters.length && "No chapter"}
         <ChaptersList
         onEdit = {()=>{}}
         onReorder = {onReorder}
         items = {initialData.chapters || []}
         />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
        Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  );
}
