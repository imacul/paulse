import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  console.log("DEBUG: User ID:", userId);
  return NextResponse.json({ userId });
}
