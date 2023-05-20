import { Task } from "@/app/models";
import { verifyJwt } from "@/lib/jwt";
import { NextResponse } from "next/server";

interface Params {
  id: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  const accessToken = request.headers.get("authorization");
  const listId = params.id;

  if (!accessToken || !verifyJwt(accessToken)) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const tasks = await Task.findAll({
    where: {
      list_id: listId,
    },
  });

  return NextResponse.json(tasks, {
    status: 200,
  });
}

export async function POST(request: Request, { params }: { params: Params }) {
  const accessToken = request.headers.get("authorization");
  const { title } = await request.json();
  const listId = params.id;

  if (!accessToken || !verifyJwt(accessToken)) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const task = await Task.create({
    title: title,
    completed: false,
    list_id: listId,
  });

  return NextResponse.json(task, {
    status: 200,
  });
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const accessToken = request.headers.get("authorization");
  const taskId = params.id;

  if (!accessToken || !verifyJwt(accessToken)) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const task = await Task.findByPk(taskId);

  if (!task) {
    return NextResponse.json(null, { status: 404 });
  }

  await task?.destroy();

  return NextResponse.json(
    {
      message: "Task deleted",
    },
    { status: 200 }
  );
}

export async function PUT(request: Request, { params }: { params: Params }) {
  const accessToken = request.headers.get("authorization");
  const taskId = params.id;
  const { title, completed } = await request.json();

  if (!accessToken || !verifyJwt(accessToken)) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const task = await Task.findByPk(taskId);

  if (!task) {
    return NextResponse.json(null, { status: 404 });
  }

  task.title = title;
  task.completed = completed;

  await task.save();

  return NextResponse.json(
    {
      message: "Task updated",
    },
    { status: 200 }
  );
}
