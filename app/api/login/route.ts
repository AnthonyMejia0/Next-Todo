import { User } from "@/app/models";
import { signJwtAccessToken } from "@/lib/jwt";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";

interface RequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const user = await User.findOne({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return NextResponse.json(null, {
      status: 404,
    });
  }

  const match = await bcrypt.compare(body.password, user.hashed_password);

  if (!match) {
    return NextResponse.json(null, {
      status: 401,
    });
  }

  const { hashed_password, ...userWithoutPass } = user.dataValues;
  const accessToken = signJwtAccessToken(userWithoutPass);

  const results = {
    ...userWithoutPass,
    accessToken,
  };

  return NextResponse.json(results, {
    status: 200,
  });
}
