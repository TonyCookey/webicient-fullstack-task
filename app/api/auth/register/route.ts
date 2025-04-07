import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const hashed = await hashPassword(password);
  const user = await prisma.user.create({ data: { email, hashedPassword: hashed } });
  return NextResponse.json(user);
}
