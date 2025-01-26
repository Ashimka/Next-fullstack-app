import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";
import { DecodedToken } from "@/types/user.type";

export async function GET() {
  const token = await getCookie("RF", { cookies });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;
    const userId = decoded.userId;

    const user = await prisma?.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error("Token verification failed:", error);
    NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
