import { NextResponse } from "next/server";
import { initDB } from "../models";

export async function GET() {
  try {
    await initDB();

    return NextResponse.json({
      status: 200,
      message: "DATABASE CONNECTED SUCCESSFULLY",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
}
