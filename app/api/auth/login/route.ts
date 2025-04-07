import { prisma } from "@/lib/db";
import { verifyPassword, generateToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.hashedPassword))) {
    return new NextResponse("Invalid credentials", { status: 401 });
  }
  const token = generateToken({ id: user.id, email: user.email });
  return NextResponse.json({ token });
}
