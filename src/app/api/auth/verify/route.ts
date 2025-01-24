import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "Токен верификации отсутствует" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Недействительный токен верификации" },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true, verificationToken: null },
    });

    return NextResponse.json(
      { message: "Email успешно подтвержден" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in email verification:", error);
    return NextResponse.json(
      { error: "Произошла ошибка при верификации email" },
      { status: 500 }
    );
  }
}
