import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { setCookie } from "cookies-next/server";
import prisma from "@/lib/prisma";
import { verifyPassword } from "@/lib/service/auth";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Неверный email или пароль" },
        { status: 400 }
      );
    }

    if (!user.isVerified) {
      return NextResponse.json(
        { error: "Пожалуйста, подтвердите ваш email перед входом" },
        { status: 400 }
      );
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Неверный email или пароль" },
        { status: 400 }
      );
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "30d",
      }
    );

    await setCookie("RF", token, {
      cookies,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      token,
    });
  } catch (error) {
    console.error("Error in login:", error);
    return NextResponse.json(
      { error: "Произошла ошибка при входе" },
      { status: 500 }
    );
  }
}
