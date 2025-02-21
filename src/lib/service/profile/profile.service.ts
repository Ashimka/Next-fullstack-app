import prisma from "@/lib/prisma";
import { UserProfile } from "@/types/user.type";

export const getUser = async (userId: string) => {
  return await prisma?.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      profile: {
        select: {
          address: true,
          phone: true,
        },
      },
    },
  });
};

export const createProfile = async ({
  userId,
  address,
  phone,
}: UserProfile) => {
  return await prisma.profile.create({
    data: {
      userId,
      address,
      phone,
    },
  });
};
