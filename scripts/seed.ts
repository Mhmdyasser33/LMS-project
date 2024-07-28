/* 
    this seed file is used to seed the database with initial value as a default values 
    until the user add new category or update to them  
 */

import { PrismaClient } from "@prisma/client";

const database = new PrismaClient() ; 

async function main(){
   try{
    await database.category.createMany({
        data : [
            {name : "Computer science" , description : ""},
            {name : "Information technology" , description : ""},
            {name : "Computer science" , description : ""},
            {name : "AI" , description : ""},
            {name : "Filming" , description : ""},
            {name : "Accounting" , description : ""}
        ]
    })

   }catch(error){
     console.log("Error in seeding database category" , error);
   }finally{
       await database.$disconnect() ; 
   }
}