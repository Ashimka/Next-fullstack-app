import { Role } from "@prisma/client";

export type UserType = {
  id: string;
  name?: string;
  email: string;
  isVerified: boolean;
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
  email: string;
  role: Role;
};
