import { DecodedToken } from "@/types/user.type";
import jwt from "jsonwebtoken";

export const createTokens = (user: DecodedToken) => {
  const refreshToken = jwt.sign(
    { userId: user.userId, email: user.email, role: user.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "30d",
    }
  );
  const accessToken = jwt.sign(
    { userId: user.userId, email: user.email, role: user.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "30m",
    }
  );

  return { refreshToken, accessToken };
};

export const validateToken = (token: string): DecodedToken | null => {
  const isValidToken = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as DecodedToken;

  return isValidToken;
};
