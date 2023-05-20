import { List } from "@/app/models";
import { verifyJwt } from "@/lib/jwt";
import { NextResponse } from "next/server";

interface Params {
  id: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  const accessToken = request.headers.get("authorization");

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

  const lists = await List.findAll({
    where: {
      user_id: params.id,
    },
  });

  if (lists.length === 0) {
    return NextResponse.json(null, {
      status: 404,
    });
  }

  return NextResponse.json(lists, {
    status: 200,
  });
}

export async function POST(request: Request, { params }: { params: Params }) {
  const accessToken = request.headers.get("authorization");
  const { title } = await request.json();

  console.log(params.id);

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

  const list = await List.create({
    title: title,
    user_id: params.id,
  });

  return NextResponse.json(list.dataValues, {
    status: 200,
  });
}

export async function PUT(request: Request, { params }: { params: Params }) {
  const accessToken = request.headers.get("authorization");
  const listId = params.id;
  const { title } = await request.json();

  console.log("TITLE =>", title);

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

  const list = await List.findByPk(listId);
  if (!list) {
    return NextResponse.json(
      {
        error: "List not found",
      },
      {
        status: 404,
      }
    );
  }

  list.title = title;
  await list.save();

  return NextResponse.json(list, {
    status: 200,
  });
}
