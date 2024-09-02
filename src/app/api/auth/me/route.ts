import { getUserSession } from "@/lib/get-user-session";
import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function GET() {
  try {
    const user = await getUserSession();

    if (!user) {
      return NextResponse.json(
        { message: "You are not authenticated" },
        { status: 401 }
      );
    }

    const data = await prisma.user.findUnique({
      where: {
        id: Number(user.id),
      },
      select: {
        fullName: true,
        email: true,
        password: false,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Error fetching data", message: "[USER_GET] Server error" },
      { status: 500 }
    );
  }
}
