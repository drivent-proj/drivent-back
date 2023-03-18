import { prisma } from "@/config";

async function findLocals() {
  return await prisma.local.findMany();
}

const localsRepository = {
  findLocals,
};

export default localsRepository;
