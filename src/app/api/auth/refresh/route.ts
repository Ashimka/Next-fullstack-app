import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next/server";
import { createTokens, validateToken } from "@/lib/service/auth/token.service";

export async function GET() {
  try {
    const refreshToken = await getCookie("RF", { cookies });

    if (!refreshToken) {
      return NextResponse.json({ message: "Не авторизован" }, { status: 401 });
    }

    const isValidToken = validateToken(refreshToken);

    if (!isValidToken) {
      return NextResponse.json({ message: "Не авторизован" }, { status: 401 });
    }

    const { token } = createTokens(isValidToken);

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Token verification failed:", error);
    NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
