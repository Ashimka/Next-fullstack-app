import { Role } from "@prisma/client";

export type UserType = {
  id: string;
  name?: string;
  email?: string;
  vkId?: number;
  isVerified: boolean;
};
export type UserVK = {
  vkId: number;
  name: string;
};

export type UserAuthForm = {
  name?: string;
  email: string;
  password: string;
};

export type UserAuthResponse = {
  user: UserType;
  token: string;
};
export type DecodedToken = {
  userId: string;
  role: Role;
};
