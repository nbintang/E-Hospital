import NextAuth, { Profile as NextAuthProfile } from "next-auth";

declare module "next-auth" {
  interface Profile extends NextAuthProfile {
    picture?: string | null; // Add the picture property
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  }
}
