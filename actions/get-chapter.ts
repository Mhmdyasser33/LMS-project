import { db } from "@/lib/db"

import { Attachment , Chapter } from "@prisma/client"
interface getChapterProps {
    userId : string ,
    courseId : string,
    chapterId : string,
}

export const getChapter = async({userId,courseId,chapterId} : getChapterProps)=>{
      try{
        
        const isUserPurchased = await db.purchase.findUnique({
            where : {
                userId_courseId : {
                    userId , 
                    courseId
                }
            }
        })
        const course = await db.course.findUnique({
            where : {
                id : courseId,
                isPublished : true
            },
            select : {
                price : true
            }
        })

        const chapter = await db.chapter.findUnique({
            where : {
                id : chapterId,
                isPublished : true
            }
        })

        if(!chapter || !course){
            throw new Error("Chapter or course not found") ; 
        }
        let muxData = null ;
        let attachments : Attachment[] = [] ; 
        let nextChapter : Chapter | null = null

        if( isUserPurchased){
        attachments = await db.attachment.findMany({
            where : {
                courseId,
            }
        })
        }

        if(chapter.isFree || isUserPurchased){
            muxData = await db.muxData.findUnique({
                where : {
                    chapterId ,
                }
            })

            nextChapter = await db.chapter.findFirst({
                where : {
                    courseId : courseId,
                    isPublished : true,
                    // get position of current chapter to net next chapter
                    position :{
                        gt : chapter?.position
                    }
                },
                orderBy : {
                    position : "asc"
                }
            })
        }
        const userProgress = await db.userProgress.findUnique({
            where : {
            userId_chapterId : {
                userId,
                chapterId
            }
            }
        });
     return{
        isUserPurchased,
        chapter,
        course,
        muxData,
        attachments,
        userProgress,
        nextChapter,
       
        }
       
      }catch(error){
        console.log("[GET_CHAPTER]" , error);
        return{
            chapter : null,
            course : null,
            muxData : null,
            attachments : [],
            nextChapter : null,
            userProgress : null,
            purchase : null
            
        }
      }
    }