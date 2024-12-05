"use server";
import authOptions from "@/lib/auth-options";
import { getServerSession } from "next-auth";

const getServerSessionOptions = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    throw new Error("Unauthorized");
  }
  return session 
};
export default getServerSessionOptions;
