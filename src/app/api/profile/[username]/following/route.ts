import { NextRequest, NextResponse } from "next/server";
import { MOCK_USERS } from "@/lib/mock-data";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  const following = MOCK_USERS.filter((u) => u.username !== username).slice(0, 5);
  return NextResponse.json(following);
}
