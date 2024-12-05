import NextAuth, { Profile as NextAuthProfile } from "next-auth";

declare module "next-auth" {
  interface Profile extends NextAuthProfile {
    picture?: string | null;
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  }

  interface Session {
    user: User; // Ensure the session's user object includes the extended User type
  }
}
