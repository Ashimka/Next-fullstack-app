import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, sendVerificationEmail } from "@/lib/service/auth";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    // Проверка, существует ли пользователь
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "Пользователь с таким email уже существует" },
        { status: 400 }
      );
    }

    // Хеширование пароля
    const hashedPassword = await hashPassword(password);

    // Создание токена верификации
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Создание пользователя
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        verificationToken,
      },
    });

    // Отправка email для верификации
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json(
      {
        message:
          "Пользователь успешно зарегистрирован. Проверьте ваш email для подтверждения.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in registration:", error);
    return NextResponse.json(
      { error: "Произошла ошибка при регистрации" },
      { status: 500 }
    );
  }
}
