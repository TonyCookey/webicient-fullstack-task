import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authenticate } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { user, error, status } = authenticate(req);
  if (error || !user) {
    return NextResponse.json({ error }, { status });
  }
  const { searchParams } = new URL(req.url);

  const projectId = searchParams.get("projectId");
  if (!projectId) {
    return new Response(JSON.stringify({ error: "Missing projectId" }), {
      status: 400,
    });
  }
  const tasks = await prisma.task.findMany({
    where: {
      projectId,
    },
  });

  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const { user, error, status } = authenticate(req);
  if (error || !user) {
    return NextResponse.json({ error }, { status });
  }

  const { title, description, status: task_status, dueDate, project_id } = await req.json();

  const task = await prisma.task.create({
    data: {
      title,
      description,
      status: task_status,
      dueDate: dueDate ? new Date(dueDate) : null,
      projectId: project_id,
    },
  });

  return NextResponse.json(task);
}
