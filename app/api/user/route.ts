import { User } from "@/app/models";
import { signJwtAccessToken } from "@/lib/jwt";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";

interface RequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();

    console.log(body);
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  // const user = await User.findOne({
  //   where: {
  //     email: body.email,
  //   },
  // });

  // if (user) {
  //   return NextResponse.json(
  //     {
  //       error: "User already exists",
  //     },
  //     {
  //       status: 403,
  //     }
  //   );
  // }

  // const salt = bcrypt.genSaltSync(10);
  // const hash = bcrypt.hashSync(body.password, salt);

  // const newUser = await User.create({
  //   name: body.name,
  //   email: body.email,
  //   hashed_password: hash,
  // });

  // const { hashed_password, ...userWithoutPass } = newUser.dataValues;
  // const accessToken = signJwtAccessToken(userWithoutPass);

  // const results = {
  //   ...userWithoutPass,
  //   accessToken,
  // };

  // return NextResponse.json(results, {
  //   status: 200,
  // });
}
