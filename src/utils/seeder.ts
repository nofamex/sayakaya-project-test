import {
  randEmail,
  randPhoneNumber,
  randPastDate,
  randFullName,
} from "@ngneat/falso";
import moment from "moment";
import { prisma } from "./prisma";

const NUM_OF_USER = 5;

/**
 * * Seed data to database. run this before starting the scheduler
 * ? Set the amount of user on NUM_OF_USER
 */
async function seeder(): Promise<void> {
  console.log("seeding started...");
  for (let index = 0; index < NUM_OF_USER; index++) {
    await prisma.users.create({
      data: {
        name: randFullName(),
        email: randEmail(),
        phone_number: randPhoneNumber(),
        birthday: moment(randPastDate().toISOString().split("T")[0]).toDate(),
      },
    });
    console.log(`seeded ${index + 1} user`);
  }
  console.log("seeding finished...");
}

seeder()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
