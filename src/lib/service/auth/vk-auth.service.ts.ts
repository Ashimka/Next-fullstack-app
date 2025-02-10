import { UserVK } from "@/types/user.type";
import prisma from "@/lib/prisma";

export const vkAuth = async (userData: UserVK) => {
  const user = await prisma?.user.findUnique({
    where: { vkId: userData.vkId },
  });

  if (!user) {
    const newUser = await prisma?.user.create({
      data: {
        vkId: userData.vkId,
        name: userData.name,
        isVerified: true,
      },
    });

    return newUser;
  }

  return user;
};
