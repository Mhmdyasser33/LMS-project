/* 
  this file is responsible for initialize the database
  with some category as a initial value for database
  and then update them in later
 */

const {PrismaClient} = require("@prisma/client") ; 

const database = new PrismaClient();

async function main(){
    try{
        await database.category.createMany({
           data : [
            {name : "Computer science"},
            {name : "Information technology" },
            {name : "Computer engineering"},
            {name : "AI" },
            {name : "Filming"},
            {name : "Accounting"}
           ]
        });
        console.log("Seeding successfully done");

    }catch(error){
        console.log("Error in seeding the database category" , error);
    }finally{
        await database.$disconnect() ; 
    }
}

main()