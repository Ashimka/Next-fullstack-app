import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteCookie } from "cookies-next/server";

export async function POST() {
  await deleteCookie("RF", { cookies });

  return NextResponse.json({ message: "Logout success" });
}
