import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authenticate } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, error, status } = authenticate(req);
  if (error || !user) {
    return NextResponse.json({ error }, { status });
  }
  const { id } = await params;
  const task = await prisma.task.findFirst({
    where: {
      id,
      project: { userId: user.id },
    },
  });

  return NextResponse.json(task);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, error, status } = authenticate(req);
  if (error || !user) {
    return NextResponse.json({ error }, { status });
  }

  const { title, description, status: task_status, dueDate } = await req.json();
  const { id } = await params;

  const task = await prisma.task.update({
    where: {
      id,
    },
    data: { title, description, status: task_status, dueDate: dueDate ? new Date(dueDate) : null },
  });

  return NextResponse.json(task);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, error, status } = authenticate(req);
  if (error || !user) {
    return NextResponse.json({ error }, { status });
  }
  const { id } = await params;
  await prisma.task.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
