import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";

 const ChapterIdPage =  async({params} : 
    {params : {courseId : string , chapterId : string}}
 )=>{

    const { userId } = auth() ;
    if( !userId){
        return redirect("/")
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
        <div>
          {userProgress?.isCompleted && (
            <Banner
              variant={`success`}
              label="You already completed this chapter"/>
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
          </div>
        </div>
    )
}

export default ChapterIdPage;