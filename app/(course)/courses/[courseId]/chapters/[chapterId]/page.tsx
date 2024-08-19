import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";
import { CourseEnrolledButton } from "./_components/course-enrolled-button";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { File } from "lucide-react";
import { CourseProgressButton } from "./course-progress-button";

 const ChapterIdPage =  async({params} : 
    {params : {courseId : string , chapterId : string}}
 )=>{

    const { userId } = auth() ;
    if( !userId){
        return redirect("/sign-in")
    } 
    
    //fetch chapter data from database
     const {
       isUserPurchased,
        chapter,
        course,
        muxData,
        attachments,
        userProgress,
        nextChapter} = await getChapter({
        userId,
        chapterId : params.chapterId,
        courseId : params.courseId
    })

    if(!chapter || !course){
        return redirect("/") ; 
    }

    const isLocked = !chapter.isFree && !isUserPurchased ;
    const completeChapterFromBeginToEnd = !!isUserPurchased && !userProgress?.isCompleted 
    return(
        <div className="text-white">
          {userProgress?.isCompleted && (
            <Banner
              variant={`success`}
              label="You already completed this chapter"
              />
          )}

           {isLocked && (
            <Banner
              variant={`warning`}
              label="You need to purchase this course to watch this chapter.. "/>
          )}

          <div className="flex max-w-4xl flex-col mx-auto pb-20">
            <div className="p-4">
              <VideoPlayer
                chapterId={params.chapterId}
                title={chapter.title}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                playBackId={muxData?.playbackId!}
                isLocked={isLocked}
                completeChapterFromBeginToEnd={completeChapterFromBeginToEnd}
                 />
            </div>
            <div>
              <div className="flex flex-col items-center justify-between p-4 md:flex-row">
                <h1 className="font-semibold text-2xl mb-2">{chapter.title}</h1>
                {isUserPurchased ? (
                    <CourseProgressButton
                    courseId={params.courseId}
                    chapterId={params.chapterId}
                    nextChapterId={nextChapter?.id}
                    isCompleted={!!userProgress?.isCompleted}/>
                ) : (
                  <CourseEnrolledButton
                  courseId={params.courseId}
                  price={course.price!}
                   />
                )}
              </div>
              <Separator className="bg-gray-200"/>
              <div>
               <Preview value={chapter.description!}/>
              {/*  {chapter.description}  when i display it as like it will be displayed as a html code but we not want this so will call preview */}
              </div>
              {!!attachments.length && (
                <>
                 <Separator className="bg-gray-200"/>
                 <div>
                  {attachments.map((attachment)=>(
                    <a
                    className="w-full flex items-center p-3 bg-sky-200 border text-sky-700 rounded-md hover:underline" 
                    href={attachment.url}
                    key={attachment.id}
                    target="_blank">
                      <File/>
                    <p className="line-clamp-1">{attachment.name}</p>
                    </a>
                  ))}
                 </div>
                </>
              )}
            </div>
          </div>
        </div>
    )
}

export default ChapterIdPage;