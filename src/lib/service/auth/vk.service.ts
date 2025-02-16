import { UserVkType } from "@/types/user.type";
import prisma from "@/lib/prisma";

export const userVkAuth = async (userData: UserVkType) => {
  const user = await prisma.user.upsert({
    where: { vkId: userData.vkId },
    update: {},
    create: {
      vkId: userData.vkId,
      name: userData.name,
      isVerified: true,
    },
  });
  return user;
};
