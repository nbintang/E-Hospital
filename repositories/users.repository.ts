import db from "@/lib/db";

export async function findUserById(id: string) {
  const user = await db.users.findFirst({ where: { id } });
  if (!user) return null;
  return user;
}
