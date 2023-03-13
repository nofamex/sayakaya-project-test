import { log } from "@/utils/logger";
import { prisma } from "@/utils/prisma";
import { Promos, Users } from "@prisma/client";
import moment from "moment";

export async function generatePromo(user: Users) {
  const promo: Promos = await prisma.promos.create({
    data: {
      name: `Birthday Promo for ${user.name}`,
      user_id: user.id,
      valid_until: new Date(moment().add("day", 1).format("YYYY-MM-DD")),
    },
  });

  log(`promos created for user: ${user.name}, with id: ${promo.id}`);
}
