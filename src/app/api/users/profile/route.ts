import { NextResponse } from "next/server";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";
import { TokenExpiredError } from "jsonwebtoken";

import prisma from "@/lib/prisma";
import { validateToken } from "@/lib/service/token.service";

export async function GET() {
  try {
    const token = await getCookie("Token", { cookies });

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const isValidToken = validateToken(token);

    const user = await prisma?.user.findUnique({
      where: { id: isValidToken?.userId },
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return NextResponse.json(
        { message: "jwt expired", expiredAt: error.expiredAt },
        { status: 401 }
      );
    }
    NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
