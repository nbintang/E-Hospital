import db from "@/lib/db";

export async function findUsers() {
  const users = await db.users.findMany({
    where: {
      role: "PATIENT",
      termAccepted: true,
    },
    select: {
      id: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      profile: {
        select: {
          fullname: true,
        },
      },
    },
  });
  return users;
}

export async function findUserById(id: string) {
  const user = await db.users.findFirst({ where: { id } });
  if (!user) return null;
  return user;
}


export async function findUserByEmail(email: string) {
  const user = await db.users.findFirst({ where: { email } });
  return user
}

