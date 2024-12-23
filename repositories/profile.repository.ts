"use server";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function findProfileByUserId({
  userId,
}: Prisma.ProfileWhereUniqueInput) {
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

export const findProfileUser = async (userId: string) =>
  await db.users.findFirst({
    where: { id: userId },
    include: { profile: {
      include: {
        address: true
      }
    } },
  });
