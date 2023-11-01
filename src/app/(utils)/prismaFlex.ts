import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export type MyType = Prisma.PromiseReturnType<typeof prisma.user.findMany>;

async function main() {
  const allUsers = await prisma.user.findMany();
  return allUsers;
}

export async function dbInteraction() {
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      // process.exit(1);
    });
}
