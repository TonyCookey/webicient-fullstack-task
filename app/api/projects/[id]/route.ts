import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authenticate } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;

  const { user, error, status } = authenticate(req);
  if (error || !user) {
    return NextResponse.json({ error }, { status });
  }
  const project = await prisma.project.findUnique({
    where: {
      id,
      userId: user.id,
    },
    include: {
      tasks: true,
    },
  });

  return NextResponse.json(project);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, error, status } = authenticate(req);
  if (error || !user) {
    return NextResponse.json({ error }, { status });
  }

  const { title, description } = await req.json();
  const { id } = await params;

  const updated = await prisma.project.update({
    where: {
      id,
      userId: user.id,
    },
    data: { title, description },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, error, status } = authenticate(req);
  if (error || !user) {
    return NextResponse.json({ error }, { status });
  }
  const { id } = await params;
  await prisma.project.delete({
    where: {
      id,
      userId: user.id,
    },
  });

  return NextResponse.json({ success: true });
}
