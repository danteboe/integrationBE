import { NextRequest, NextResponse } from "next/server";
import { CURRENT_USER, MOCK_USERS } from "@/lib/mock-data";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  if (username === CURRENT_USER.username) {
    return NextResponse.json(MOCK_USERS.slice(0, 5));
  }

  return NextResponse.json([CURRENT_USER, ...MOCK_USERS.slice(0, 2)]);
}
