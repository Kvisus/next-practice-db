import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

// const prisma = new PrismaClient();
// PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

//----------------------------------------------------
export type MyType = Prisma.PromiseReturnType<typeof prisma.user.findMany>;

async function main() {
  const allUsers = await prisma.user.findMany({
    include: {
      Post_Post_authorIdToUser: true,
    },
  });
  console.log(allUsers);
  return allUsers;
}

export async function dbInteraction() {
  return main()
    .then(async (result) => {
      await prisma.$disconnect();
      return result;
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      // process.exit(1);
    });
}
