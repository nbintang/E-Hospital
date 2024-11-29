import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the id property
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // Add role if needed
    };
  }

  interface User {
    id: string; // Ensure User also has the id property
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string; // Add role if needed
  }
}