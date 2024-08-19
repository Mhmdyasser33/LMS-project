export const isTeacher = (teacherId?:string | null)=>{
    return teacherId === process.env.NEXT_PUBLIC_TEACHER_ID;
}