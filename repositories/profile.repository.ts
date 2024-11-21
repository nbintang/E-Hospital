import db from "@/lib/db";

export async function findProfileByUserId({ userId }: { userId: string }) {
  const profile = await db.profile.findFirst({
    where: {
      userId,
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });
  return profile;
}

