"use server";
import authOptions from "@/lib/auth-options";
import { getServerSession } from "next-auth";

const getAuthenticatedUserSession = async () => {
  const session = await getServerSession(authOptions);
  return session ?? null;
};
export default getAuthenticatedUserSession;
