/* 
  this file is responsible for initialize the database
  with some category as a initial value for database
  and then update them in later
 */

const {PrismaClient} = require("@prisma/client") ; 

const database = new PrismaClient();

async function main(){
    try{
       /*  await database.category.deleteMany(); */
        await database.category.createMany({
           data : [
            {name : "Computer science"},
            {name : "Accounting" },
            {name : "Engineering"},
            {name : "Fitness" },
            {name : "Filming"},
            {name : "Photography"},
            {name : "AI"}
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