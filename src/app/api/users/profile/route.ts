import { NextResponse } from "next/server";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";
import { validateToken } from "@/lib/service/token.service";

export async function GET() {
  const token = await getCookie("RF", { cookies });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
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
    console.error("Token verification failed:", error);
    NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
