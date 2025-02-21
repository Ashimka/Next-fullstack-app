import { NextResponse } from "next/server";
import { TokenExpiredError } from "jsonwebtoken";

import { getUserFromToken } from "@/lib/service/auth/token.service";
import { createProfile, getUser } from "@/lib/service/profile/profile.service";

export async function GET() {
  try {
    const { userId } = await getUserFromToken();

    if (!userId) {
      return NextResponse.json({ message: "jwt expired" }, { status: 401 });
    }
    const user = await getUser(userId);

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return NextResponse.json(
        { message: "jwt expired", expiredAt: error.expiredAt },
        { status: 401 }
      );
    }
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
export async function POST(req: Request) {
  try {
    const { address, phone } = await req.json();
    const { userId } = await getUserFromToken();
    if (!address || !phone) {
      return NextResponse.json({ error: "Нет данных" }, { status: 400 });
    }

    const profile = await createProfile({ userId, address, phone });

    return NextResponse.json(profile);
  } catch (err) {
    console.log({ err });

    return NextResponse.json(
      { message: "Неудалось добавить данные" },
      { status: 400 }
    );
  }
}
