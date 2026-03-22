import { NextRequest, NextResponse } from "next/server";
import { CURRENT_USER, MOCK_USERS } from "@/lib/mock-data";

function getFollowingStore(): Set<string> {
  const g = globalThis as typeof globalThis & {
    __fakeFollowingStore?: Set<string>;
  };

  if (!g.__fakeFollowingStore) {
    g.__fakeFollowingStore = new Set<string>();
  }

  return g.__fakeFollowingStore;
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  if (username === CURRENT_USER.username) {
    return NextResponse.json(
      { error: "Cannot follow yourself" },
      { status: 400 }
    );
  }

  const targetUser =
    MOCK_USERS.find((u) => u.username === username) ??
    ({
      id: `u_${username}`,
      username,
      name: username,
      avatar: `https://api.dicebear.com/8.x/notionists/svg?seed=${username}`,
      bio: "This account hasn't set up their profile yet.",
      followersCount: 0,
      followingCount: 0,
      postsCount: 0,
      isVerified: false,
    });

  const followingStore = getFollowingStore();
  const wasFollowing = followingStore.has(username);

  if (wasFollowing) {
    followingStore.delete(username);
    CURRENT_USER.followingCount = Math.max(0, CURRENT_USER.followingCount - 1);
    targetUser.followersCount = Math.max(0, targetUser.followersCount - 1);
  } else {
    followingStore.add(username);
    CURRENT_USER.followingCount += 1;
    targetUser.followersCount += 1;
  }

  return NextResponse.json({
    isFollowing: !wasFollowing,
    followersCount: targetUser.followersCount,
    followingCount: CURRENT_USER.followingCount,
  });
}
