import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authenticate } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { user, error, status } = authenticate(req);
  if (error || !user) {
    return NextResponse.json({ error }, { status });
  }

  const projects = await prisma.project.findMany({
    where: { userId: user.id },
  });

  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const { user, error, status } = authenticate(req);
  if (error || !user) {
    return NextResponse.json({ error }, { status });
  }

  const { title, description } = await req.json();

  const project = await prisma.project.create({
    data: {
      title,
      description,
      userId: user.id,
    },
  });

  return NextResponse.json(project);
}
