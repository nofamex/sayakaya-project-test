import * as dotenv from "dotenv";
import cron from "node-cron";
import { prisma } from "@/utils/prisma";
import { Users } from "@prisma/client";
import { mail } from "@/modules/mailer";
import { generatePromo } from "@/modules/promo";
import moment from "moment";

dotenv.config();

/**
 * * Cron will start every 00:00 am every single day.
 */
cron.schedule("* 0 * * *", async () => {
  const todayDate: string = moment().format("YYYY-MM-DD");

  const users: Users[] = await prisma.users.findMany({
    where: {
      birthday: new Date(todayDate),
    },
  });

  if (users.length > 0) {
    users.forEach(async (user: Users) => {
      await mail(user);
      await generatePromo(user);
    });
  }
});
