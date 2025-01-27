import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next/server";
import { createTokens, validateToken } from "@/lib/service/token.service";

export async function GET() {
  try {
    const token = await getCookie("RF", { cookies });

    if (!token) {
      return NextResponse.json({ message: "Не авторизован" }, { status: 401 });
    }

    const isValidToken = validateToken(token);

    if (!isValidToken) {
      return NextResponse.json({ message: "Не авторизован" }, { status: 401 });
    }

    const { accessToken } = createTokens(isValidToken);

    return NextResponse.json(accessToken);
  } catch (error) {
    console.error("Token verification failed:", error);
    NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
