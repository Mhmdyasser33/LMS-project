"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const schema = z.object({
  title: z.string().min(1, "title is required"),
});

const CreatePage = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
    },
  });
  const router = useRouter() ;

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try{
        const response = await axios.post("/api/courses",values);
        // console.log(response);
        router.push(`/teacher/courses/${response.data.id}`)
        toast.success("Course created")
    }catch{
        toast.error("Something went wrong");
    }
  };


  const { isSubmitting, isValid } = form.formState;

  return (
    <div className="max-w-5xl mx-auto flex med:item-center md:justify-center h-full p-6">
      <div className="text-2xl">
        <h1>Name your course</h1>
        <p className="text-sm text-slate-600">
          What would you like to name your course? Don&apos;t worry, you can
          change this later.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced web development'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will teach in this course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2 justify-between">
            <Link href={`/`}>
            <Button type="button"
            className="bg-slate-200 hover:bg-slate-300">
              Cancel
            </Button>
            </Link>
             <Button
             type="submit"
             disabled={!isValid || isSubmitting}
            className="bg-black text-white"
            >
             Continue
            </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;