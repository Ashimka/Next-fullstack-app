import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { setCookie } from "cookies-next/server";
import axios from "axios";

import { createTokens } from "@/lib/service/auth/token.service";
import { userVkAuth } from "@/lib/service/auth/vk.service";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  const CLIENT_ID = process.env.VK_CLIENT_ID!;
  const CLIENT_SECRET = process.env.VK_CLIENT_SECRET!;
  const redirectUri =
    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/vk/callback`!;

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  try {
    // Обмен кода на access_token
    const tokenUrl = `https://oauth.vk.com/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${redirectUri}&code=${code}`;
    const tokenData = await axios.get(tokenUrl);

    const { data } = await axios.get("https://api.vk.com/method/users.get", {
      params: {
        access_token: tokenData.data.access_token,
        client_id: CLIENT_ID,
        v: "5.131",
      },
    });

    const user = await userVkAuth({
      vkId: data.response[0].id,
      name: data.response[0].first_name,
    });

    //  Создаем JWT
    const { refreshToken } = createTokens({
      userId: user.id,
      role: user.role,
    });

    // Сохраняем JWT в куки
    await setCookie("RF", refreshToken, {
      cookies,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 30,
    });

    // Перенаправляем пользователя на главную страницу
    return NextResponse.redirect(new URL("/profile", req.url));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Произошла ошибка при входе" },
      { status: 500 }
    );
  }
}
