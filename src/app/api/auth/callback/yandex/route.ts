import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { setCookie } from "cookies-next/server";
import axios from "axios";

import prisma from "@/lib/prisma";
import { createTokens } from "@/lib/service/auth/token.service";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const CLIENT_ID = process.env.YANDEX_CLIENT_ID!;
  const CLIENT_SECRET = process.env.YANDEX_CLIENT_SECRET!;

  if (!code) {
    return NextResponse.json({ error: "Code is missing" }, { status: 400 });
  }

  try {
    const { data } = await axios.post(
      "https://oauth.yandex.ru/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const userInfo = await axios.get("https://login.yandex.ru/info", {
      headers: { Authorization: `OAuth ${data.access_token}` },
    });

    const user = await prisma?.user.upsert({
      where: {
        email: userInfo.data.default_email,
      },
      update: {
        isVerified: true,
        verificationToken: null,
      },
      create: {
        email: userInfo.data.default_email,
        name: userInfo.data.first_name,
      },
    });

    const { refreshToken } = createTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    await setCookie("RF", refreshToken, {
      cookies,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 30,
    });

    return NextResponse.redirect(new URL("/profile", req.url));
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { error: "Произошла ошибка при входе" },
      { status: 500 }
    );
  }
}
