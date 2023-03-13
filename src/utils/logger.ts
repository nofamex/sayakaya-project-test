import { prisma } from "@/utils/prisma";

/**
 * * Wrapper for log writer to db
 * @param arg
 */
export async function log(arg: string) {
  await prisma.logs.create({
    data: {
      description: arg,
    },
  });
}
