"use server";
import authOptions from "@/lib/auth-options";
import { getServerSession } from "next-auth";

const getAuthenticatedUserSession = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return null;
  }
  return session;
};
export default getAuthenticatedUserSession;
