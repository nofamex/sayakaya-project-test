import { randEmail, randPhoneNumber, randPastDate } from "@ngneat/falso";
import { prisma } from "./prisma";

const NUM_OF_USER = 5;

async function seeder(): Promise<void> {
  console.log("seeding started...");
  for (let index = 0; index < NUM_OF_USER; index++) {
    await prisma.users.create({
      data: {
        email: randEmail(),
        phone_number: randPhoneNumber(),
        birthday: randPastDate(),
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
